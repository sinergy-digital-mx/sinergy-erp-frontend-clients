import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Branch } from '../../models/branch.model';
import {
  PosSessionListItem,
  formatPosCurrency,
  formatPosDateTime,
  posSessionEquipmentLabel,
  posSessionUserLabel,
  resolveSessionBranchLabel,
  sessionExpectedCash,
  sessionOpeningCash,
  sessionTotalSales,
  sessionTurnLabel,
} from '../../../pos/models/pos-session.model';

export interface PosSessionCloseDialogData {
  session: PosSessionListItem;
  branches: Branch[];
}

@Component({
  selector: 'app-pos-session-close-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './pos-session-close-dialog.component.html',
  styleUrl: './pos-session-close-dialog.component.scss',
})
export class PosSessionCloseDialogComponent {
  closingCash = signal(0);
  notes = signal('');
  Math = Math;

  constructor(
    private dialogRef: MatDialogRef<PosSessionCloseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PosSessionCloseDialogData
  ) {
    this.closingCash.set(sessionExpectedCash(data.session));
  }

  get session(): PosSessionListItem {
    return this.data.session;
  }

  turnLabel = sessionTurnLabel;
  equipmentLabel = posSessionEquipmentLabel;
  userLabel = posSessionUserLabel;
  formatDate = formatPosDateTime;
  formatMoney = formatPosCurrency;

  branchLabel(): string {
    return resolveSessionBranchLabel(this.session, this.data.branches);
  }

  openingCash(): number {
    return sessionOpeningCash(this.session);
  }

  totalSales(): number {
    return sessionTotalSales(this.session);
  }

  expectedCash(): number {
    return sessionExpectedCash(this.session);
  }

  difference(): number {
    return this.closingCash() - this.expectedCash();
  }

  differenceType(): 'exact' | 'surplus' | 'shortage' {
    const diff = this.difference();
    if (diff > 0) {
      return 'surplus';
    }
    if (diff < 0) {
      return 'shortage';
    }
    return 'exact';
  }

  onConfirm(): void {
    if (this.closingCash() < 0) {
      return;
    }
    this.dialogRef.close({
      closing_balance: this.closingCash(),
      notes: this.notes(),
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
