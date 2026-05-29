import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Branch } from '../../models/branch.model';
import {
  PosSessionListItem,
  formatPosCurrency,
  formatPosDateTime,
  parsePosMoney,
  posSessionEquipmentLabel,
  posSessionUserLabel,
  resolveSessionBranchLabel,
  sessionExpectedCash,
  sessionIsOpen,
  sessionOpeningCash,
  sessionTotalSales,
  sessionTurnLabel,
} from '../../../pos/models/pos-session.model';

export interface PosSessionDetailModalData {
  session: PosSessionListItem;
  branches: Branch[];
}

@Component({
  selector: 'app-pos-session-detail-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './pos-session-detail-modal.component.html',
  styleUrl: './pos-session-detail-modal.component.scss',
})
export class PosSessionDetailModalComponent {
  constructor(
    private dialogRef: MatDialogRef<PosSessionDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PosSessionDetailModalData
  ) {}

  get session(): PosSessionListItem {
    return this.data.session;
  }

  turnLabel = sessionTurnLabel;
  equipmentLabel = posSessionEquipmentLabel;
  userLabel = posSessionUserLabel;
  formatDate = formatPosDateTime;
  formatMoney = formatPosCurrency;
  isOpen = sessionIsOpen;

  closedByLabel(): string {
    return posSessionUserLabel({ id: '', user: this.session.closed_by });
  }

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

  closingCash(): number {
    return parsePosMoney(this.session.closing_cash);
  }

  cashDifference(): number {
    const explicit = parsePosMoney(this.session.cash_difference);
    if (explicit !== 0 || this.session.cash_difference != null) {
      return explicit;
    }
    if (!this.session.closed_at) {
      return 0;
    }
    return this.closingCash() - this.expectedCash();
  }

  differenceClass(): string {
    const diff = this.cashDifference();
    if (diff === 0) {
      return 'pos-session-detail__diff--ok';
    }
    return diff > 0 ? 'pos-session-detail__diff--surplus' : 'pos-session-detail__diff--shortage';
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
