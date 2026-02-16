import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, combineLatest, map, switchMap, of } from 'rxjs';
import { Role, Module } from '../../models';
import { StateService } from '../../services/state.service';
import { RoleService } from '../../services/role.service';
import { ModuleService } from '../../services/module.service';
import { BackButtonComponent } from '../../components/back-button/back-button.component';
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
  imports: [CommonModule, BackButtonComponent],
  template: `
    <!-- Roles Management Container with Two-Column Layout -->
    <div class="p-6 bg-white rounded-xl shadow-sm border border-gray-100">
      <!-- Header with Back Button -->
      <div class="flex items-center gap-3 mb-6">
        <app-back-button (clicked)="goBackToSettings()"></app-back-button>
        <h1 class="text-2xl font-semibold text-gray-900">Roles & Permissions Management</h1>
      </div>

      <!-- Main Content -->
      <div class="flex gap-6 h-[calc(100vh-200px)]">
        <!-- Left Panel: Role List -->
        <div class="w-1/3 bg-gray-50 rounded-lg border border-gray-200 flex flex-col overflow-hidden">
          <!-- Header -->
          <div class="px-6 py-4 border-b border-gray-200 bg-white">
            <h2 class="text-lg font-semibold text-gray-900">Roles</h2>
          </div>

          <!-- Search and Create Button Section -->
          <div class="px-6 py-4 border-b border-gray-200 bg-white space-y-3">
            <!-- Search Input -->
            <input
              type="text"
              placeholder="Search roles..."
              (input)="onRoleSearchChange($event)"
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <!-- Create New Role Button -->
            <button
              (click)="onCreateRoleClicked()"
              class="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create New Role
            </button>
          </div>

          <!-- Role List -->
          <div class="flex-1 overflow-y-auto bg-white">
            @if (filteredRoles$ | async; as roles) {
              @if (roles.length === 0) {
                <div class="p-4 text-center text-gray-500">
                  <p>No roles found</p>
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
                          <p class="text-xs text-gray-500 mt-1">
                            {{ role.permissions.length }} permission{{ role.permissions.length !== 1 ? 's' : '' }}
                          </p>
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
        <div class="flex-1 bg-gray-50 rounded-lg border border-gray-200 flex flex-col overflow-hidden">
          @if (selectedRole$ | async; as role) {
            <div class="flex flex-col h-full bg-white">
              <!-- Role Details Header -->
              <div class="px-6 py-4 border-b border-gray-200">
                <h3 class="text-xl font-semibold text-gray-900">{{ role.name }}</h3>
                <p class="text-sm text-gray-600 mt-1">{{ role.description }}</p>
              </div>

              <!-- Role Details Content -->
              <div class="flex-1 overflow-y-auto p-6">
                <p class="text-gray-500">Role details and permission management will be implemented in subsequent tasks.</p>
              </div>
            </div>
          } @else {
            <div class="flex items-center justify-center h-full bg-white">
              <div class="text-center">
                <p class="text-gray-500 text-lg">Select a role to view details</p>
              </div>
            </div>
          }
        </div>
      </div>
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
   * Clears the selected role and prepares for new role creation
   */
  onCreateRoleClicked(): void {
    // Clear the selected role to show the creation form
    this.stateService.selectRole(null);
    // Emit event to show creation form (will be implemented in subsequent tasks)
  }

  /**
   * Navigates back to Settings
   */
  goBackToSettings(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }
}
