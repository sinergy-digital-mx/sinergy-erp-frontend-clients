import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, BehaviorSubject, startWith } from 'rxjs';
import { User, Role } from '../../models';
import { SelectComponent, ISelect } from '../../../../core/components/select/select.component';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomSnackbarComponent } from '../../../../core/components/custom-snackbar/custom-snackbar.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { UserEditDialogComponent } from '../user-edit-dialog/user-edit-dialog.component';

/**
 * UserDetailsComponent
 * Presentational component for displaying selected user information
 * 
 * Displays user email, status, creation date, and current roles
 * Shows message if no roles are assigned
 * Provides role assignment and replacement interfaces
 * 
 * Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 6.1, 6.2, 6.3, 6.4, 6.5, 7.1, 7.2, 7.3, 7.4
 */
@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, SelectComponent, ButtonComponent],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit {
  /**
   * The user to display details for
   */
  @Input() user!: User;

  /**
   * Observable stream of roles assigned to the user
   */
  @Input() userRoles$!: Observable<Role[]>;

  /**
   * Observable stream of available roles for assignment
   */
  @Input() availableRoles$?: Observable<Role[]>;

  /**
   * Observable stream indicating if roles are loading
   */
  @Input() isLoadingRoles$?: Observable<boolean>;

  /**
   * Event emitted when a role is assigned to the user
   */
  @Output() roleAssigned = new EventEmitter<{ userId: string; roleId: string }>();

  /**
   * Event emitted when a user's role is replaced
   */
  @Output() roleReplaced = new EventEmitter<{
    userId: string;
    oldRoleId: string;
    newRoleId: string;
  }>();

  /**
   * Event emitted when a role is deleted from a user
   */
  @Output() roleDeleted = new EventEmitter<{ userId: string; roleId: string }>();

  /**
   * Event emitted when a user is updated
   */
  @Output() userUpdated = new EventEmitter<void>();

  // Internal state for role replacement dropdown
  showRoleReplacementDropdown$ = new BehaviorSubject<boolean>(false);
  selectedRoleIdForReplacement: string | null = null;
  selectedRoleIdForAssignment$ = new BehaviorSubject<string | null>(null);

  // Select component configurations
  assignRoleSelectConfig: ISelect = {
    placeholder: 'Select a role to assign',
    data: [],
    value: 'id',
    option: 'name',
    name_select: 'role',
    value_default: null,
    all: false
  };

  replaceRoleSelectConfig: ISelect = {
    placeholder: 'Select a new role',
    data: [],
    value: 'id',
    option: 'name',
    name_select: 'role',
    value_default: null,
    all: false
  };

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog) {}

  ngOnInit(): void {
    // Update select config data when available roles change
    if (this.availableRoles$) {
      this.availableRoles$.subscribe(roles => {
        this.assignRoleSelectConfig.data = roles;
        this.replaceRoleSelectConfig.data = roles;
      });
    }
  }

  /**
   * Opens the role replacement dropdown for a specific role
   * @param roleId - The ID of the role to replace
   */
  openRoleReplacementDropdown(roleId: string): void {
    this.selectedRoleIdForReplacement = roleId;
    this.showRoleReplacementDropdown$.next(true);
  }

  /**
   * Handles role assignment selection
   * @param event - The select change event
   */
  onRoleAssignmentChange(event: any): void {
    if (event.value) {
      this.selectedRoleIdForAssignment$.next(event.value);
    } else {
      this.selectedRoleIdForAssignment$.next(null);
    }
  }

  /**
   * Confirms and submits the role assignment
   */
  confirmRoleAssignment(): void {
    const selectedRoleId = this.selectedRoleIdForAssignment$.value;
    if (selectedRoleId) {
      // Show confirmation dialog
      this.dialog.open(ConfirmDialogComponent, {
        data: {
          title: 'Assign Role',
          message: `Are you sure you want to assign this role to ${this.user.email}?`,
          confirmText: 'Assign',
          cancelText: 'Cancel'
        }
      }).afterClosed().subscribe(result => {
        if (result) {
          this.roleAssigned.emit({
            userId: this.user.id,
            roleId: selectedRoleId
          });
          this.selectedRoleIdForAssignment$.next(null);
          // Reset the select
          this.assignRoleSelectConfig.value_default = null;
        }
      });
    }
  }

  /**
   * Handles role replacement selection
   * @param event - The select change event
   */
  onRoleReplacementChange(event: any): void {
    if (event.value && this.selectedRoleIdForReplacement) {
      this.roleReplaced.emit({
        userId: this.user.id,
        oldRoleId: this.selectedRoleIdForReplacement,
        newRoleId: event.value
      });
      // Close the replacement dropdown
      this.showRoleReplacementDropdown$.next(false);
      this.selectedRoleIdForReplacement = null;
      // Reset the select
      this.replaceRoleSelectConfig.value_default = null;
    }
  }

  /**
   * Deletes a role from the user
   * @param roleId - The ID of the role to delete
   */
  deleteRoleFromUser(roleId: string): void {
    // Find the role name for the confirmation message
    const roles = this.userRoles$ as any;
    let roleName = 'this role';
    
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Remove Role',
        message: `Are you sure you want to remove this role from ${this.user.email}? This action cannot be undone.`,
        confirmText: 'Remove',
        cancelText: 'Cancel',
        isDangerous: true
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.roleDeleted.emit({
          userId: this.user.id,
          roleId: roleId
        });
      }
    });
  }

  /**
   * Returns the CSS class for the status badge based on user status
   * @param status - The user status
   * @returns CSS class string for the status badge
   */
  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
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
   * Opens the edit user dialog
   */
  openEditDialog(): void {
    this.dialog.open(UserEditDialogComponent, {
      data: { user: this.user }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.userUpdated.emit();
      }
    });
  }
}
