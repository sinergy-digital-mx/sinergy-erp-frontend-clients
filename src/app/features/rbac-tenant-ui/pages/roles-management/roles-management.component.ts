import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, combineLatest, map, BehaviorSubject } from 'rxjs';
import { Role, Module } from '../../models';
import { StateService } from '../../services/state.service';
import { RoleService } from '../../services/role.service';
import { ModuleService } from '../../services/module.service';
import { BackButtonComponent } from '../../components/back-button/back-button.component';
import { RolePermissionsManagerComponent } from '../../components/role-permissions-manager/role-permissions-manager.component';
import { RoleEditFormComponent } from '../../components/role-edit-form/role-edit-form.component';
import { RoleCreateDialogComponent } from '../../components/role-create-dialog/role-create-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from '../../../../core/components/custom-snackbar/custom-snackbar.component';
import { EmptyStageComponent } from '../../../../core/components/empty-stage/empty-stage.component';

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
  imports: [CommonModule, BackButtonComponent, RolePermissionsManagerComponent, RoleEditFormComponent, RoleCreateDialogComponent, EmptyStageComponent],
  styleUrl: './roles-management.component.scss',
  templateUrl: './roles-management.component.html',
})
export class RolesManagementComponent implements OnInit {
  roles$: Observable<Role[]>;
  filteredRoles$: Observable<Role[]>;
  selectedRoleId$: Observable<string | null>;
  selectedRole$: Observable<Role | null>;
  modules$: Observable<Module[]>;
  roleSearchFilter$: Observable<string>;

  showOnlyUnconfigurated = false;
  showCreateDialog = false;
  readonly isLoadingRoles$ = new BehaviorSubject<boolean>(true);
  readonly skeletonSlots = [0, 1, 2, 3, 4, 5];
  private showOnlyUnconfiguratedSubject = new BehaviorSubject<boolean>(false);

  constructor(
    private stateService: StateService,
    private roleService: RoleService,
    private moduleService: ModuleService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.roles$ = this.stateService.roles$;
    this.filteredRoles$ = this.stateService.filteredRoles$;
    this.selectedRoleId$ = this.stateService.selectedRoleId$;
    this.modules$ = this.stateService.modules$;
    this.roleSearchFilter$ = this.stateService.roleSearchFilter$;

    this.selectedRole$ = combineLatest([this.selectedRoleId$, this.roles$]).pipe(
      map(([selectedId, roles]) => {
        if (!selectedId) return null;
        return roles.find(r => r.id === selectedId) || null;
      })
    );
  }

  ngOnInit(): void {
    this.loadRoles();

    this.moduleService.getModules().subscribe(
      modules => {
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

  private loadRoles(selectRoleId?: string): void {
    this.isLoadingRoles$.next(true);
    this.roleService.getRoles().subscribe({
      next: (roles) => {
        this.stateService.updateRoles(roles);
        if (selectRoleId) {
          this.stateService.selectRole(selectRoleId);
        }
        this.isLoadingRoles$.next(false);
      },
      error: (error) => {
        console.error('Failed to load roles:', error);
        this.isLoadingRoles$.next(false);
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: error.error?.message || 'Failed to load roles', type: 'error' },
          duration: 5000
        });
      }
    });
  }

  onRoleSelected(roleId: string): void {
    this.stateService.selectRole(roleId);
  }

  onRoleSearchChange(event: Event): void {
    const searchText = (event.target as HTMLInputElement).value;
    this.stateService.setRoleSearchFilter(searchText);
  }

  onCreateRoleClicked(): void {
    this.showCreateDialog = true;
  }

  onRoleCreated(newRole: Role): void {
    this.showCreateDialog = false;
    this.loadRoles(newRole.id);
  }

  onCreateDialogCancelled(): void {
    this.showCreateDialog = false;
  }

  goBackToSettings(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  onRoleUpdated(_updatedRole: Role) {
    this.loadRoles();
  }

  onRoleDeleted(roleId: string) {
    if (roleId) {
      this.stateService.clearRoleSelection();
    }
    this.loadRoles();
  }

  onPermissionsUpdated(updatedRole: Role) {
    this.roleService.clearCache();
    this.roleService.getRoles().subscribe({
      next: (roles) => {
        this.stateService.updateRoles(roles);
      },
      error: (error) => {
        console.error('Error refreshing roles:', error);
      }
    });
  }

  getPermissionCount(role: Role): number {
    return role.permission_count ?? role.permissions?.length ?? 0;
  }

  getPermissionBadgeClass(role: Role): string {
    const count = this.getPermissionCount(role);
    if (count === 0) {
      return 'role-card__status role-card__status--empty';
    } else if (count <= 5) {
      return 'role-card__status role-card__status--basic';
    }
    return 'role-card__status role-card__status--full';
  }

  getPermissionStatusText(role: Role): string {
    const count = this.getPermissionCount(role);
    if (count === 0) {
      return 'Sin configurar';
    } else if (count <= 5) {
      return 'Básico';
    }
    return 'Completo';
  }

  getRoleInitials(role: Role): string {
    const name = role.name?.trim() || '';
    const parts = name.split(/\s+/).filter(Boolean);
    if (parts.length >= 2) {
      return `${parts[0].charAt(0)}${parts[1].charAt(0)}`.toUpperCase();
    }
    return (name.slice(0, 2) || '?').toUpperCase();
  }
}
