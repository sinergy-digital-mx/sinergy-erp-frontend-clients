import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, BehaviorSubject, Subscription } from 'rxjs';
import { User, Role, getPosUserTypeLabel, userHasOpenGlobalCut } from '../../models';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { UserDetailModalComponent } from '../user-detail-modal/user-detail-modal.component';
import { LucideAngularModule, Shield, Plus, RefreshCw, Trash2, X } from 'lucide-angular';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, ButtonComponent, LucideAngularModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent implements OnInit, OnDestroy {
  readonly icons = { Shield, Plus, RefreshCw, Trash2, X };

  @Input() user!: User;
  @Input() userRoles$!: Observable<Role[]>;
  @Input() availableRoles$?: Observable<Role[]>;
  @Input() isLoadingRoles$?: Observable<boolean>;

  @Output() roleAssigned = new EventEmitter<{ userId: string; roleId: string }>();
  @Output() roleReplaced = new EventEmitter<{ userId: string; oldRoleId: string; newRoleId: string }>();
  @Output() roleDeleted = new EventEmitter<{ userId: string; roleId: string }>();
  @Output() userUpdated = new EventEmitter<void>();

  availableRoles: Role[] = [];
  selectedAssignRoleId = '';
  replacingRoleId: string | null = null;
  selectedReplaceRoleId = '';

  selectedRoleIdForAssignment$ = new BehaviorSubject<string | null>(null);
  private rolesSub?: Subscription;

  constructor(private snackBar: MatSnackBar, private dialog: MatDialog) {}

  ngOnInit(): void {
    if (this.availableRoles$) {
      this.rolesSub = this.availableRoles$.subscribe((roles) => {
        this.availableRoles = roles;
      });
    }
  }

  ngOnDestroy(): void {
    this.rolesSub?.unsubscribe();
  }

  get userInitials(): string {
    const first = (this.user.first_name || this.user.name || '?').charAt(0);
    const last = (this.user.last_name || '').charAt(0);
    return (first + last).toUpperCase();
  }

  onAssignRoleChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedAssignRoleId = value;
    this.selectedRoleIdForAssignment$.next(value || null);
  }

  confirmRoleAssignment(): void {
    const selectedRoleId = this.selectedRoleIdForAssignment$.value;
    if (!selectedRoleId) return;

    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Asignar rol',
        message: `¿Asignar este rol a ${this.user.email}?`,
        confirmText: 'Asignar',
        cancelText: 'Cancelar'
      }
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.roleAssigned.emit({ userId: this.user.id, roleId: selectedRoleId });
        this.selectedAssignRoleId = '';
        this.selectedRoleIdForAssignment$.next(null);
      }
    });
  }

  openRoleReplacement(roleId: string): void {
    this.replacingRoleId = roleId;
    this.selectedReplaceRoleId = '';
  }

  cancelRoleReplacement(): void {
    this.replacingRoleId = null;
    this.selectedReplaceRoleId = '';
  }

  confirmRoleReplacement(): void {
    if (!this.replacingRoleId || !this.selectedReplaceRoleId) return;

    this.roleReplaced.emit({
      userId: this.user.id,
      oldRoleId: this.replacingRoleId,
      newRoleId: this.selectedReplaceRoleId
    });
    this.replacingRoleId = null;
    this.selectedReplaceRoleId = '';
  }

  deleteRoleFromUser(roleId: string): void {
    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Eliminar rol',
        message: `¿Eliminar este rol de ${this.user.email}? Esta acción no se puede deshacer.`,
        confirmText: 'Eliminar',
        cancelText: 'Cancelar',
        isDangerous: true
      }
    }).afterClosed().subscribe((result) => {
      if (result) {
        this.roleDeleted.emit({ userId: this.user.id, roleId });
      }
    });
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'active':
        return 'user-detail__status--active';
      case 'inactive':
        return 'user-detail__status--inactive';
      case 'pending':
        return 'user-detail__status--pending';
      default:
        return 'user-detail__status--inactive';
    }
  }

  getNormalizedStatus(status: any): string {
    if (typeof status === 'string') return status;
    if (status && typeof status === 'object' && status.code) return status.code;
    return 'active';
  }

  getPosUserLabel(): string {
    return this.user.is_pos_user ? 'Sí' : 'No';
  }

  getPosUserTypeLabel(): string {
    if (!this.user.is_pos_user) {
      return '—';
    }
    return getPosUserTypeLabel(this.user.pos_user_type) ?? '—';
  }

  hasOpenGlobalCut(): boolean {
    return userHasOpenGlobalCut(this.user);
  }

  getPosUserCodeLabel(): string | null {
    if (this.user.is_pos_user || !this.user.pos_user_code) {
      return null;
    }
    return String(this.user.pos_user_code);
  }

  getBillingBranchCode(): string | null {
    const branch = this.user.billing_branch;
    if (!branch) {
      return null;
    }
    return branch.display_name?.trim() || branch.code?.trim() || null;
  }

  getBillingBranchLabel(): string {
    if (this.getBillingBranchCode()) {
      return this.getBillingBranchCode()!;
    }
    if (this.user.has_all_branches_access) {
      return 'Todas las sucursales';
    }
    return '—';
  }

  openEditDialog(): void {
    this.dialog.open(UserDetailModalComponent, {
      width: '620px',
      maxHeight: '90vh',
      panelClass: 'custom-dialog-container',
      data: { user: this.user, isNew: false }
    }).afterClosed().subscribe((result) => {
      if (result) this.userUpdated.emit();
    });
  }
}
