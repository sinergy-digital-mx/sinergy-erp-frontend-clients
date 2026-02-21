import { Component, Input, Output, EventEmitter, OnInit, OnChanges, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Role } from '../../models';
import { RoleService } from '../../services/role.service';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from '../../../../core/components/custom-snackbar/custom-snackbar.component';
import { forkJoin } from 'rxjs';

interface PermissionItem {
  id: string;
  name: string;
  description: string;
  isAssigned: boolean;
}

interface ModulePermissions {
  module_id: string;
  module_name: string;
  permissions: PermissionItem[];
}

@Component({
  selector: 'app-role-permissions-manager',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  template: `
    <div class="role-permissions-manager">
      @if (loading) {
        <div class="flex items-center justify-center py-8">
          <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span class="ml-3 text-gray-600">Cargando permisos...</span>
        </div>
      } @else {
        <!-- Save Button -->
        <div class="mb-6 flex justify-between items-center">
          <div class="text-sm text-gray-600">
            <span class="font-medium">{{ getTotalAssignedPermissions() }}</span> permisos asignados
          </div>
          <app-button
            text="Guardar Cambios"
            custom_class="btn_primary"
            [loading]="saving"
            [disabled]="saving || !hasChanges"
            (clicked)="savePermissions()">
          </app-button>
        </div>

        <!-- Modules and Permissions -->
        <div class="space-y-6">
          @for (module of modulePermissions; track module.module_id) {
            <div class="border border-gray-200 rounded-lg overflow-hidden">
              <!-- Module Header -->
              <div class="bg-gray-50 px-4 py-3 border-b border-gray-200">
                <div class="flex items-center justify-between">
                  <div class="flex items-center">
                    <span class="text-lg mr-2">📦</span>
                    <h3 class="text-lg font-medium text-gray-900">{{ module.module_name }}</h3>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="text-sm text-gray-600">
                      {{ getModuleAssignedCount(module) }}/{{ module.permissions.length }} permisos
                    </span>
                    <button
                      (click)="toggleAllModulePermissions(module)"
                      class="text-sm text-blue-600 hover:text-blue-800 font-medium">
                      {{ isModuleFullyAssigned(module) ? 'Desmarcar Todo' : 'Marcar Todo' }}
                    </button>
                  </div>
                </div>
              </div>

              <!-- Permissions List -->
              <div class="p-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                  @for (permission of module.permissions; track $index) {
                    <label class="flex items-start space-x-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer transition-colors">
                      <input
                        type="checkbox"
                        [checked]="permission.isAssigned"
                        (change)="togglePermission(permission)"
                        class="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded">
                      <div class="flex-1 min-w-0">
                        <div class="flex items-center">
                          <span 
                            [class]="permission.isAssigned ? 'text-green-600' : 'text-gray-400'"
                            class="mr-2">
                            {{ permission.isAssigned ? '☑️' : '☐' }}
                          </span>
                          <p class="text-sm font-medium text-gray-900">{{ permission.name }}</p>
                        </div>
                        <p class="text-xs text-gray-500 mt-1">{{ permission.description }}</p>
                      </div>
                    </label>
                  }
                </div>
              </div>
            </div>
          }
        </div>

        @if (modulePermissions.length === 0) {
          <div class="text-center py-8">
            <p class="text-gray-500">No hay módulos disponibles para este tenant.</p>
          </div>
        }
      }
    </div>
  `,
  styles: [`
    .role-permissions-manager {
      max-height: calc(100vh - 300px);
      overflow-y: auto;
    }

    .role-permissions-manager::-webkit-scrollbar {
      width: 8px;
    }

    .role-permissions-manager::-webkit-scrollbar-track {
      background: transparent;
    }

    .role-permissions-manager::-webkit-scrollbar-thumb {
      background: #d1d5db;
      border-radius: 4px;
    }

    .role-permissions-manager::-webkit-scrollbar-thumb:hover {
      background: #9ca3af;
    }
  `]
})
export class RolePermissionsManagerComponent implements OnInit, OnChanges {
  @Input() role: Role | null = null;
  @Output() permissionsUpdated = new EventEmitter<Role>();

  modulePermissions: ModulePermissions[] = [];
  loading = false;
  saving = false;
  hasChanges = false;
  originalPermissions: Set<string> = new Set();

  constructor(
    private roleService: RoleService,
    private snackBar: MatSnackBar,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    if (this.role) {
      this.loadPermissions();
    }
  }

  ngOnChanges() {
    if (this.role) {
      this.loadPermissions();
    }
  }

  private loadPermissions() {
    if (!this.role) return;

    this.loading = true;
    this.hasChanges = false;
    this.cdr.markForCheck();

    // Use the new endpoint that returns role with permissions and their assignment status
    this.roleService.getRolePermissionsAvailable(this.role.id).subscribe({
      next: (response) => {
        console.log('Permissions loaded successfully:', response);
        this.processPermissions(response);
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (error) => {
        console.error('Error loading permissions:', error);
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { 
            message: error.error?.message || 'Error al cargar permisos', 
            type: 'error' 
          },
          duration: 5000
        });
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  private processPermissions(response: any) {
    console.log('Processing permissions response:', response);
    
    // Validate response structure
    if (!response || !response.modules || !Array.isArray(response.modules)) {
      console.error('Invalid response structure:', response);
      this.modulePermissions = [];
      return;
    }

    // Store original permissions for change detection
    const assignedPermissions = response.modules
      .flatMap(module => module.permissions || [])
      .filter(permission => permission.assigned)
      .map(permission => permission.id);
    
    this.originalPermissions = new Set(assignedPermissions);

    // Process modules and permissions with assignment status
    this.modulePermissions = response.modules.map(module => ({
      module_id: module.id,
      module_name: module.name,
      permissions: (module.permissions || []).map(permission => ({
        id: permission.id,
        name: permission.action,
        description: permission.description,
        isAssigned: permission.assigned || false
      }))
    }));
    
    console.log('Processed modules:', this.modulePermissions);
  }

  togglePermission(permission: PermissionItem) {
    permission.isAssigned = !permission.isAssigned;
    this.checkForChanges();
  }

  toggleAllModulePermissions(module: ModulePermissions) {
    const isFullyAssigned = this.isModuleFullyAssigned(module);
    module.permissions.forEach(permission => {
      permission.isAssigned = !isFullyAssigned;
    });
    this.checkForChanges();
  }

  isModuleFullyAssigned(module: ModulePermissions): boolean {
    return module.permissions.every(p => p.isAssigned);
  }

  getModuleAssignedCount(module: ModulePermissions): number {
    return module.permissions.filter(p => p.isAssigned).length;
  }

  getTotalAssignedPermissions(): number {
    return this.modulePermissions.reduce((total, module) => 
      total + this.getModuleAssignedCount(module), 0
    );
  }

  private checkForChanges() {
    const currentPermissions = new Set(
      this.modulePermissions
        .flatMap(module => module.permissions)
        .filter(p => p.isAssigned)
        .map(p => p.id)
    );

    this.hasChanges = !this.setsEqual(this.originalPermissions, currentPermissions);
  }

  private setsEqual(set1: Set<string>, set2: Set<string>): boolean {
    if (set1.size !== set2.size) return false;
    for (const item of set1) {
      if (!set2.has(item)) return false;
    }
    return true;
  }

  savePermissions() {
    if (!this.role || this.saving || !this.hasChanges) return;

    this.saving = true;

    const assignedPermissionIds = this.modulePermissions
      .flatMap(module => module.permissions)
      .filter(p => p.isAssigned)
      .map(p => p.id);

    this.roleService.updateRolePermissions(this.role.id, assignedPermissionIds).subscribe({
      next: (updatedRole) => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { 
            message: 'Permisos actualizados correctamente', 
            type: 'success' 
          },
          duration: 3000
        });
        
        this.originalPermissions = new Set(assignedPermissionIds);
        this.hasChanges = false;
        this.saving = false;
        
        // Emit the updated role
        this.permissionsUpdated.emit(updatedRole);
      },
      error: (error) => {
        console.error('Error saving permissions:', error);
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { 
            message: error.error?.message || 'Error al guardar permisos', 
            type: 'error' 
          },
          duration: 5000
        });
        this.saving = false;
      }
    });
  }
}