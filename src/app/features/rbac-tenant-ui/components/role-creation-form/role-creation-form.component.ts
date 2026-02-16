import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { Module, RoleDefinition } from '../../models';

/**
 * RoleCreationFormComponent
 * Presentational component for creating a new role with permissions
 * 
 * Requirements: 11.2, 11.3, 17.1, 17.2, 17.3
 */
@Component({
  selector: 'app-role-creation-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="p-6 space-y-6">
      <!-- Form Header -->
      <div>
        <h3 class="text-xl font-semibold text-gray-900">Create New Role</h3>
        <p class="text-sm text-gray-600 mt-1">Define a new role with custom permissions</p>
      </div>

      <!-- Role Name Input -->
      <div>
        <label for="roleName" class="block text-sm font-medium text-gray-700">Role Name</label>
        <input
          id="roleName"
          type="text"
          [(ngModel)]="roleName"
          placeholder="Enter role name"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      <!-- Role Description Input -->
      <div>
        <label for="roleDescription" class="block text-sm font-medium text-gray-700">Description</label>
        <textarea
          id="roleDescription"
          [(ngModel)]="roleDescription"
          placeholder="Enter role description"
          rows="3"
          class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        ></textarea>
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
          [disabled]="!isFormValid()"
          [class.opacity-50]="!isFormValid()"
          [class.cursor-not-allowed]="!isFormValid()"
          class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:hover:bg-blue-600"
        >
          Create Role
        </button>
      </div>
    </div>
  `,
  styles: []
})
export class RoleCreationFormComponent implements OnInit {
  /**
   * Observable stream of available modules with their permissions
   */
  @Input() modules$!: Observable<Module[]>;

  /**
   * Event emitted when role is saved
   */
  @Output() roleSaved = new EventEmitter<RoleDefinition>();

  /**
   * Event emitted when form is cancelled
   */
  @Output() cancelled = new EventEmitter<void>();

  // Form fields
  roleName: string = '';
  roleDescription: string = '';
  selectedPermissions: Set<string> = new Set();
  expandedModules: Set<string> = new Set();

  ngOnInit(): void {
    // Initialize form
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
  }

  /**
   * Checks if a permission is selected
   * @param permissionId - The ID of the permission
   * @returns true if the permission is selected
   */
  isPermissionSelected(permissionId: string): boolean {
    return this.selectedPermissions.has(permissionId);
  }

  /**
   * Checks if the form is valid
   * @returns true if the form is valid (name entered and permissions selected)
   */
  isFormValid(): boolean {
    return this.roleName.trim().length > 0 && this.selectedPermissions.size > 0;
  }

  /**
   * Handles form cancellation
   */
  onCancel(): void {
    this.cancelled.emit();
  }

  /**
   * Handles form submission
   */
  onSave(): void {
    if (!this.isFormValid()) {
      return;
    }

    const roleDefinition: RoleDefinition = {
      name: this.roleName.trim(),
      description: this.roleDescription.trim(),
      permissions: Array.from(this.selectedPermissions)
    };

    this.roleSaved.emit(roleDefinition);
  }
}
