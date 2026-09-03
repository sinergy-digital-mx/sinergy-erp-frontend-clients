import { Injectable, inject, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from '../../../core/services/auth.service';
import {
  PosBranchSelectDialogComponent,
  PosBranchSelectResult,
} from '../components/pos-branch-select-dialog/pos-branch-select-dialog.component';

@Injectable({ providedIn: 'root' })
export class PosBranchSessionService {
  static readonly SESSION_KEY = 'pos_branch_session_confirmed';

  private readonly auth = inject(AuthService);
  private readonly dialog = inject(MatDialog);

  readonly label = signal(this.computeLabel());

  canSwitch(): boolean {
    return this.auth.canSwitchBranch();
  }

  isConfirmed(): boolean {
    return sessionStorage.getItem(PosBranchSessionService.SESSION_KEY) === '1';
  }

  markConfirmed(): void {
    sessionStorage.setItem(PosBranchSessionService.SESSION_KEY, '1');
  }

  syncLabel(explicit?: string): void {
    this.label.set(explicit?.trim() || this.computeLabel());
  }

  currentLabel(): string {
    return this.label();
  }

  ensureSelected(): Observable<boolean> {
    return this.auth.refreshMyBranches().pipe(
      catchError(() => of(undefined)),
      switchMap(() => {
        this.syncLabel();
        if (!this.canSwitch()) {
          this.markConfirmed();
          return of(true);
        }
        if (this.isConfirmed() && this.auth.getBillingBranchId()) {
          return of(true);
        }
        return this.pickBranch({ required: true });
      })
    );
  }

  pickBranch(opts: { required: boolean }): Observable<boolean> {
    const branches = this.auth.getAssignedBranches();
    if (branches.length <= 1) {
      this.markConfirmed();
      this.syncLabel();
      return of(false);
    }

    const previousId = this.auth.getBillingBranchId();
    const dialogRef = this.dialog.open(PosBranchSelectDialogComponent, {
      width: '440px',
      maxWidth: '95vw',
      disableClose: opts.required,
      panelClass: 'pos-dialog-panel',
      data: {
        branches,
        currentId: previousId,
        required: opts.required,
      },
    });

    return dialogRef.afterClosed().pipe(
      map((result: PosBranchSelectResult | undefined) => {
        if (!result?.id) {
          return false;
        }
        this.markConfirmed();
        this.syncLabel(result.label);
        return result.id !== previousId;
      })
    );
  }

  private computeLabel(): string {
    const currentId = this.auth.getBillingBranchId();
    const match = this.auth.getAssignedBranches().find((row) => row.id === currentId);
    return match?.display_name || match?.code || 'Sucursal';
  }
}
