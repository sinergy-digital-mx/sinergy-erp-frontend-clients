import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, combineLatest, map, switchMap, of, BehaviorSubject } from 'rxjs';
import { Role, Module } from '../../models';
import { StateService } from '../../services/state.service';
import { RoleService } from '../../services/role.service';
import { ModuleService } from '../../services/module.service';
import { BackButtonComponent } from '../../components/back-button/back-button.component';
import { RolePermissionsManagerComponent } from '../../components/role-permissions-manager/role-permissions-manager.component';
import { RoleEditFormComponent } from '../../components/role-edit-form/role-edit-form.component';
import { RoleCreateDialogComponent } from '../../components/role-create-dialog/role-create-dialog.component';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from '../../../../core/components/custom-snackbar/custom-snackbar.component';

/**
 * RolesManagementComponent
 * Container component for managing tenant roles and permissions
 * Displays a two-column layout with role list on the left and role details on the right
 * 
 * Requirements: 8.1, 9.1, 10.1
 */
@Component({
  selector: 'app-roles-management',
  standalone: true,
  imports: [CommonModule, BackButtonComponent, RolePermissionsManagerComponent, RoleEditFormComponent, RoleCreateDialogComponent, ButtonComponent],
  template: `
    <!-- Roles Management Container with Two-Column Layout -->
    <div class="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <!-- Header with Back Button -->
      <div class="flex items-center gap-3 mb-6">
        <app-back-button (clicked)="goBackToSettings()"></app-back-button>
        <h1 class="text-2xl font-semibold text-gray-900">Gestión de Roles y Permisos</h1>
      </div>

      <!-- Main Content -->
      <div class="flex gap-6 h-[calc(100vh-200px)] items-center justify-center">
        <!-- Left Panel: Role List -->
        <div class="w-1/3 bg-gray-50 rounded-lg border border-gray-200 flex flex-col overflow-hidden h-full">
          <!-- Header -->
          <div class="px-6 py-4 border-b border-gray-200 bg-white">
            <h2 class="text-lg font-semibold text-gray-900">Roles</h2>
          </div>

          <!-- Search and Create Button Section -->
          <div class="px-6 py-4 border-b border-gray-200 bg-white space-y-3">
            <!-- Search and Create Row -->
            <div class="flex gap-3 flex-wrap">
              <!-- Search Input -->
              <input
                type="text"
                placeholder="Buscar roles..."
                (input)="onRoleSearchChange($event)"
                class="flex-1 min-w-[200px] px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              
              <!-- Create New Role Button -->
              <app-button
                text="Nuevo Rol"
                custom_class="btn_primary"
                (clicked)="onCreateRoleClicked()">
              </app-button>
            </div>
          </div>

          <!-- Role List -->
          <div class="flex-1 overflow-y-auto bg-white">
            @if (filteredRoles$ | async; as roles) {
              @if (roles.length === 0) {
                <div class="p-4 text-center text-gray-500">
                  <p>No se encontraron roles</p>
                </div>
              } @else {
                @for (role of roles; track role.id) {
                  <div class="border-b border-gray-100 last:border-b-0">
                    <button
                      (click)="onRoleSelected(role.id)"
                      [class.bg-blue-50]="(selectedRoleId$ | async) === role.id"
                      class="w-full text-left px-6 py-4 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                    >
                      <div class="flex items-center justify-between">
                        <div class="flex-1 min-w-0">
                          <p class="text-sm font-medium text-gray-900 truncate">{{ role.name }}</p>
                          <div class="flex items-center gap-2 mt-1">
                            <span class="text-xs text-gray-500">
                              {{ getPermissionCount(role) }} permiso{{ getPermissionCount(role) !== 1 ? 's' : '' }}
                            </span>
                            <span 
                              [class]="getPermissionBadgeClass(role)"
                              class="inline-flex items-center px-1.5 py-0.5 rounded-full text-xs font-medium">
                              {{ getPermissionStatusText(role) }}
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  </div>
                }
              }
            }
          </div>
        </div>

        <!-- Right Panel: Role Details -->
        <div class="flex-1 bg-gray-50 rounded-lg border border-gray-200 flex flex-col overflow-hidden h-full">
          @if (selectedRole$ | async; as role) {
            <div class="flex flex-col h-full bg-white">
              <!-- Role Details Header -->
              <div class="px-6 py-4 border-b border-gray-200">
                <app-role-edit-form
                  [role]="role"
                  (roleUpdated)="onRoleUpdated($event)"
                  (roleDeleted)="onRoleDeleted($event)">
                </app-role-edit-form>
                
                <!-- Role Stats -->
                <div class="flex items-center gap-4 mt-4">
                  <div class="flex items-center gap-2">
                    <span class="text-sm text-gray-500">Permisos:</span>
                    <span 
                      [class]="getPermissionBadgeClass(role)"
                      class="inline-flex items-center px-2 py-1 rounded-full text-sm font-medium">
                      {{ getPermissionCount(role) }}
                    </span>
                  </div>
                  
                  <div class="flex items-center gap-2">
                    <span class="text-sm text-gray-500">Estado:</span>
                    <span 
                      [class]="getPermissionBadgeClass(role)"
                      class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium">
                      {{ getPermissionStatusText(role) }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Role Details Content -->
              <div class="flex-1 overflow-y-auto p-6">
                <app-role-permissions-manager
                  [role]="role"
                  (permissionsUpdated)="onPermissionsUpdated($event)">
                </app-role-permissions-manager>
              </div>
            </div>
          } @else {
            <div class="flex items-center justify-center h-full bg-white">
              <div class="text-center">
                <p class="text-gray-500 text-lg">Selecciona un rol para ver detalles</p>
              </div>
            </div>
          }
        </div>
      </div>

      <!-- Create Role Dialog -->
      @if (showCreateDialog) {
        <app-role-create-dialog
          (roleCreated)="onRoleCreated($event)"
          (cancelled)="onCreateDialogCancelled()">
        </app-role-create-dialog>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }

    .w-1-3 {
      flex: 0 0 33.333%;
    }

    .w-2-3 {
      flex: 0 0 66.667%;
    }

    .overflow-y-auto {
      overflow-y: auto;
      -webkit-overflow-scrolling: touch;
    }

    .overflow-y-auto::-webkit-scrollbar {
      width: 8px;
    }

    .overflow-y-auto::-webkit-scrollbar-track {
      background: transparent;
    }

    .overflow-y-auto::-webkit-scrollbar-thumb {
      background: #d1d5db;
      border-radius: 4px;
    }

    .overflow-y-auto::-webkit-scrollbar-thumb:hover {
      background: #9ca3af;
    }

    button:hover {
      background-color: #f9fafb;
    }

    button:focus {
      outline: none;
    }
  `]
})
export class RolesManagementComponent implements OnInit {
  // Observable streams from state service
  roles$: Observable<Role[]>;
  filteredRoles$: Observable<Role[]>;
  selectedRoleId$: Observable<string | null>;
  selectedRole$: Observable<Role | null>;
  modules$: Observable<Module[]>;
  roleSearchFilter$: Observable<string>;
  
  // Local component state
  showOnlyUnconfigurated = false;
  showCreateDialog = false;
  private showOnlyUnconfiguratedSubject = new BehaviorSubject<boolean>(false);

  constructor(
    private stateService: StateService,
    private roleService: RoleService,
    private moduleService: ModuleService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    // Initialize observables from state service
    this.roles$ = this.stateService.roles$;
    this.filteredRoles$ = this.stateService.filteredRoles$;
    this.selectedRoleId$ = this.stateService.selectedRoleId$;
    this.modules$ = this.stateService.modules$;
    this.roleSearchFilter$ = this.stateService.roleSearchFilter$;

    // Create selectedRole$ by combining selectedRoleId$ with roles$
    this.selectedRole$ = combineLatest([this.selectedRoleId$, this.roles$]).pipe(
      map(([selectedId, roles]) => {
        if (!selectedId) return null;
        return roles.find(r => r.id === selectedId) || null;
      })
    );
  }

  ngOnInit(): void {
    // Fetch roles on component initialization
    this.roleService.getRoles().subscribe(
      roles => {
        console.log('Roles loaded:', roles);
        this.stateService.updateRoles(roles);
      },
      (error) => {
        console.error('Failed to load roles:', error);
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: error.error?.message || 'Failed to load roles', type: 'error' },
          duration: 5000
        });
      }
    );

    // Fetch modules for permission selection
    this.moduleService.getModules().subscribe(
      modules => {
        console.log('Modules loaded:', modules);
        this.stateService.updateModules(modules);
      },
      (error) => {
        console.error('Failed to load modules:', error);
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: error.error?.message || 'Failed to load modules', type: 'error' },
          duration: 5000
        });
      }
    );
  }

  /**
   * Handles role selection from the left panel
   * Updates the state service with the selected role ID
   * @param roleId - The ID of the selected role
   */
  onRoleSelected(roleId: string): void {
    this.stateService.selectRole(roleId);
  }

  /**
   * Handles role search filter changes
   * Updates the state service with the search filter
   * @param event - The input event from the search field
   */
  onRoleSearchChange(event: Event): void {
    const searchText = (event.target as HTMLInputElement).value;
    this.stateService.setRoleSearchFilter(searchText);
  }

  /**
   * Handles create new role button click
   * Opens the create role dialog
   */
  onCreateRoleClicked(): void {
    this.showCreateDialog = true;
  }

  /**
   * Handles role creation from the dialog
   * Refreshes the roles list and selects the new role
   */
  onRoleCreated(newRole: Role): void {
    this.showCreateDialog = false;
    
    // Refresh roles list
    this.roleService.getRoles().subscribe(roles => {
      this.stateService.updateRoles(roles);
      
      // Select the newly created role to show permissions manager
      this.stateService.selectRole(newRole.id);
    });
  }

  /**
   * Handles create dialog cancellation
   */
  onCreateDialogCancelled(): void {
    this.showCreateDialog = false;
  }

  /**
   * Navigates back to Settings
   */
  goBackToSettings(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  /**
   * Handles role updates from the edit form
   */
  onRoleUpdated(updatedRole: Role) {
    // Refresh roles list
    this.roleService.getRoles().subscribe(roles => {
      this.stateService.updateRoles(roles);
    });
  }

  /**
   * Handles role deletion from the edit form
   */
  onRoleDeleted(roleId: string) {
    // Clear selection if the deleted role was selected
    if (this.stateService.selectedRoleId$ && roleId) {
      this.stateService.clearRoleSelection();
    }
    
    // Refresh roles list
    this.roleService.getRoles().subscribe(roles => {
      this.stateService.updateRoles(roles);
    });
  }

  /**
   * Handles permission updates from the permissions manager
   */
  onPermissionsUpdated(updatedRole: Role) {
    console.log('Permissions updated, refreshing roles list');
    
    // Clear the cache to force a fresh fetch
    this.roleService.clearCache();
    
    // Refresh roles list to get updated permission counts
    this.roleService.getRoles().subscribe(
      roles => {
        console.log('Roles refreshed after permission update:', roles);
        console.log('Updated role:', roles.find(r => r.id === updatedRole.id));
        
        // Update the state service with fresh roles
        this.stateService.updateRoles(roles);
      },
      (error) => {
        console.error('Error refreshing roles:', error);
      }
    );
  }

  /**
   * Gets the permission count from the role, preferring backend count over array length
   */
  getPermissionCount(role: Role): number {
    // Use permission_count from backend if available, otherwise fall back to array length
    return role.permission_count ?? role.permissions?.length ?? 0;
  }

  /**
   * Gets the CSS classes for the permission status badge
   */
  getPermissionBadgeClass(role: Role): string {
    const count = this.getPermissionCount(role);
    if (count === 0) {
      return 'bg-red-100 text-red-800'; // No permissions - red
    } else if (count <= 5) {
      return 'bg-yellow-100 text-yellow-800'; // Few permissions - yellow
    } else {
      return 'bg-green-100 text-green-800'; // Many permissions - green
    }
  }

  /**
   * Gets the status text for the permission badge
   */
  getPermissionStatusText(role: Role): string {
    const count = this.getPermissionCount(role);
    if (count === 0) {
      return 'Sin configurar';
    } else if (count <= 5) {
      return 'Básico';
    } else {
      return 'Completo';
    }
  }
}
