import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable, combineLatest, map, switchMap, of, BehaviorSubject, startWith } from 'rxjs';
import { User, Role } from '../../models';
import { StateService } from '../../services/state.service';
import { UserService } from '../../services/user.service';
import { RoleService } from '../../services/role.service';
import { UserSearchFilterComponent } from '../../components/user-search-filter/user-search-filter.component';
import { UserDetailsComponent } from '../../components/user-details/user-details.component';
import { BackButtonComponent } from '../../../../core/components/back-button/back-button.component';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from '../../../../core/components/custom-snackbar/custom-snackbar.component';
import { MatDialog } from '@angular/material/dialog';
import { UserCreationDialogComponent } from '../../components/user-creation-dialog/user-creation-dialog.component';

/**
 * UsersManagementComponent
 * Container component for managing tenant users
 * Displays a two-column layout with user list on the left and user details on the right
 * 
 * Requirements: 2.1, 3.1, 4.1, 5.1
 */
@Component({
  selector: 'app-users-management',
  standalone: true,
  imports: [CommonModule, UserSearchFilterComponent, UserDetailsComponent, BackButtonComponent, ButtonComponent],
  templateUrl: './users-management.component.html',
  styleUrl: './users-management.component.scss'
})
export class UsersManagementComponent implements OnInit {
  // Observable streams from state service
  users$: Observable<User[]>;
  filteredUsers$: Observable<User[]>;
  selectedUserId$: Observable<string | null>;
  selectedUser$: Observable<User | null>;
  selectedUserRoles$: Observable<Role[]>;
  isLoadingRoles$: Observable<boolean>;
  roles$: Observable<Role[]>;
  userSearchFilter$: Observable<string>;
  userStatusFilter$: Observable<string>;

  // Trigger for refreshing user roles
  private refreshUserRoles$ = new BehaviorSubject<number>(0);

  constructor(
    private stateService: StateService,
    private userService: UserService,
    private roleService: RoleService,
    private snackBar: MatSnackBar,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {
    // Initialize observables from state service
    this.users$ = this.stateService.users$;
    this.filteredUsers$ = this.stateService.filteredUsers$;
    this.selectedUserId$ = this.stateService.selectedUserId$;
    this.roles$ = this.stateService.roles$;
    this.userSearchFilter$ = this.stateService.userSearchFilter$;
    this.userStatusFilter$ = this.stateService.userStatusFilter$;

    // Create selectedUser$ by combining selectedUserId$ with users$
    this.selectedUser$ = combineLatest([this.selectedUserId$, this.users$]).pipe(
      map(([selectedId, users]) => {
        if (!selectedId) return null;
        return users.find(u => u.id === selectedId) || null;
      })
    );

    // Create selectedUserRoles$ by fetching roles for the selected user
    // This will refresh whenever selectedUserId$ or refreshUserRoles$ changes
    this.selectedUserRoles$ = combineLatest([this.selectedUserId$, this.refreshUserRoles$]).pipe(
      switchMap(([userId]) => {
        if (!userId) return of([]);
        return this.userService.getUserRoles(userId);
      })
    );

    // Create isLoadingRoles$ to track loading state
    this.isLoadingRoles$ = combineLatest([this.selectedUserId$, this.refreshUserRoles$]).pipe(
      switchMap(([userId]) => {
        if (!userId) return of(false);
        return this.userService.getUserRoles(userId).pipe(
          map(() => false),
          startWith(true)
        );
      })
    );
  }

  ngOnInit(): void {
    // Fetch users on component initialization
    this.userService.getUsers().subscribe(users => {
      console.log('Users loaded:', users);
      this.stateService.updateUsers(users);
    });

    // Fetch roles for the role assignment dropdown
    this.roleService.getRoles().subscribe(roles => {
      console.log('Roles loaded:', roles);
      this.stateService.updateRoles(roles);
    });
  }

  /**
   * Handles user selection from the left panel
   * Updates the state service with the selected user ID
   * @param userId - The ID of the selected user
   */
  onUserSelected(userId: string): void {
    this.stateService.selectUser(userId);
  }

  /**
   * Navigates back to Settings
   */
  goBackToSettings(): void {
    this.router.navigate(['../'], { relativeTo: this.activatedRoute });
  }

  /**
   * Opens the create user dialog
   */
  openCreateUserDialog(): void {
    this.dialog.open(UserCreationDialogComponent, {
      width: '466px',
      disableClose: false,
      panelClass: 'custom-dialog-container'
    }).afterClosed().subscribe(result => {
      if (result) {
        // Refresh users list
        this.userService.getUsers().subscribe(users => {
          this.stateService.updateUsers(users);
        });
      }
    });
  }

  /**
   * Handles role assignment to a user
   * @param event - The role assignment event containing userId and roleId
   */
  onRoleAssigned(event: { userId: string; roleId: string }): void {
    this.userService.assignRoleToUser(event.userId, event.roleId).subscribe({
      next: () => {
        // Success: Trigger refresh of user roles
        this.refreshUserRoles$.next(this.refreshUserRoles$.value + 1);
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: 'Rol asignado correctamente', type: 'success' },
          duration: 3000
        });
      },
      error: (error) => {
        // Error: Display error message
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: error.error?.message || 'No pudimos asignar el rol', type: 'error' },
          duration: 5000
        });
      }
    });
  }

  /**
   * Handles role replacement for a user
   * @param event - The role replacement event containing userId, oldRoleId, and newRoleId
   */
  onRoleReplaced(event: { userId: string; oldRoleId: string; newRoleId: string }): void {
    this.userService.replaceUserRole(event.userId, event.oldRoleId, event.newRoleId).subscribe({
      next: () => {
        // Success: Trigger refresh of user roles
        this.refreshUserRoles$.next(this.refreshUserRoles$.value + 1);
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: 'Rol reemplazado correctamente', type: 'success' },
          duration: 3000
        });
      },
      error: (error) => {
        // Error: Display error message
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: error.error?.message || 'No pudimos reemplazar el rol', type: 'error' },
          duration: 5000
        });
      }
    });
  }

  /**
   * Handles role deletion from a user
   * @param event - The role deletion event containing userId and roleId
   */
  onRoleDeleted(event: { userId: string; roleId: string }): void {
    this.userService.deleteRoleFromUser(event.userId, event.roleId).subscribe({
      next: () => {
        // Success: Trigger refresh of user roles
        this.refreshUserRoles$.next(this.refreshUserRoles$.value + 1);
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: 'Rol eliminado correctamente', type: 'success' },
          duration: 3000
        });
      },
      error: (error) => {
        // Error: Display error message
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: error.error?.message || 'No pudimos eliminar el rol', type: 'error' },
          duration: 5000
        });
      }
    });
  }

  /**
   * Normalizes status from object or string format to string
   * @param status - The status (can be string or object)
   * @returns Normalized status string
   */
  getNormalizedStatus(status: any): string {
    if (typeof status === 'string') {
      return status;
    }
    if (status && typeof status === 'object' && status.code) {
      return status.code;
    }
    return 'active';
  }

  /**
   * Handles user update event
   * Refreshes the users list and maintains the selected user
   */
  onUserUpdated(): void {
    // Clear the user service cache first
    this.userService.clearCache();
    
    // Get current selected user ID before refreshing
    let currentSelectedId: string | null = null;
    this.selectedUserId$.subscribe(id => currentSelectedId = id).unsubscribe();
    
    this.userService.getUsers().subscribe(users => {
      this.stateService.updateUsers(users);
      // Re-select the user to trigger UI update
      if (currentSelectedId) {
        // Small delay to ensure state is updated
        setTimeout(() => {
          this.stateService.selectUser(currentSelectedId!);
        }, 50);
      }
    });
  }

  /**
   * Gets the CSS class for status badge
   * @param status - The status
   * @returns CSS class string
   */
  getStatusClass(status: any): string {
    const normalizedStatus = this.getNormalizedStatus(status);
    switch (normalizedStatus) {
      case 'active':
        return 'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800';
      case 'inactive':
        return 'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800';
      case 'pending':
        return 'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800';
      default:
        return 'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800';
    }
  }
}
