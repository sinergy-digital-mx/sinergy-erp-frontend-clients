import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { AuthService, AssignedBranch } from '../../../../core/services/auth.service';
import { resolveHttpErrorMessage } from '../../../../core/utils/http-error-message.util';
import { mapPosApiErrorMessage } from '../../constants/pos-api-errors';

export interface PosBranchSelectDialogData {
  branches: AssignedBranch[];
  currentId: string | null;
  required: boolean;
}

export interface PosBranchSelectResult {
  id: string;
  label: string;
}

@Component({
  selector: 'app-pos-branch-select-dialog',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './pos-branch-select-dialog.component.html',
  styleUrl: './pos-branch-select-dialog.component.scss',
})
export class PosBranchSelectDialogComponent {
  selectedId = signal<string | null>(null);
  error = signal<string | null>(null);
  saving = signal(false);

  constructor(
    private dialogRef: MatDialogRef<PosBranchSelectDialogComponent, PosBranchSelectResult | undefined>,
    private auth: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: PosBranchSelectDialogData
  ) {
    this.selectedId.set(
      data.currentId || data.branches.find((row) => row.is_primary)?.id || data.branches[0]?.id || null
    );
  }

  branchLabel(branch: AssignedBranch): string {
    return branch.display_name || branch.code || branch.id;
  }

  selectBranch(branch: AssignedBranch): void {
    if (this.saving()) {
      return;
    }
    this.selectedId.set(branch.id);
    this.error.set(null);
  }

  cancel(): void {
    if (this.data.required || this.saving()) {
      return;
    }
    this.dialogRef.close();
  }

  confirm(): void {
    const value = this.selectedId();
    const branch = this.data.branches.find((row) => row.id === value);
    if (!value || !branch) {
      this.error.set('Selecciona una sucursal');
      return;
    }
    if (this.saving()) {
      return;
    }

    const result: PosBranchSelectResult = { id: value, label: this.branchLabel(branch) };
    if (value === this.data.currentId) {
      this.dialogRef.close(result);
      return;
    }

    this.saving.set(true);
    this.error.set(null);
    this.dialogRef.disableClose = true;
    this.auth.setActiveBranch(value).subscribe({
      next: () => this.dialogRef.close(result),
      error: (err) => {
        this.saving.set(false);
        this.dialogRef.disableClose = this.data.required;
        this.error.set(
          mapPosApiErrorMessage(resolveHttpErrorMessage(err, 'No se pudo cambiar la sucursal'))
        );
      },
    });
  }
}
