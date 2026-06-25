import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  PosDailyShiftDetail,
  dailyShiftBranchLabel,
  dailyShiftIsOpen,
  dailyShiftPartialCount,
  dailyShiftSalesTotal,
  dailyShiftStatusLabel,
  dailyShiftTerminalLabel,
  formatPosMoney,
  parsePosMoney,
} from '../../../pos/models/pos-daily-shift.model';
import { POSService } from '../../../pos/services/pos.service';
import { ButtonComponent } from '../../../../core/components/button/button.component';

@Component({
  selector: 'app-pos-daily-shift-detail-modal',
  standalone: true,
  imports: [CommonModule, ButtonComponent],
  templateUrl: './pos-daily-shift-detail-modal.component.html',
  styleUrl: './pos-daily-shift-detail-modal.component.scss',
})
export class PosDailyShiftDetailModalComponent {
  loading = signal(true);
  shift = signal<PosDailyShiftDetail | null>(null);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { shiftId: string },
    private dialogRef: MatDialogRef<PosDailyShiftDetailModalComponent>,
    private posService: POSService
  ) {
    this.posService.getDailyShift(data.shiftId).subscribe({
      next: (shift) => {
        this.shift.set(shift);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  close(): void {
    this.dialogRef.close();
  }

  terminalLabel(shift: PosDailyShiftDetail): string {
    return dailyShiftTerminalLabel(shift);
  }

  branchLabel(shift: PosDailyShiftDetail): string {
    return dailyShiftBranchLabel(shift);
  }

  statusLabel(shift: PosDailyShiftDetail): string {
    return dailyShiftStatusLabel(shift.status);
  }

  isOpen(shift: PosDailyShiftDetail): boolean {
    return dailyShiftIsOpen(shift);
  }

  salesTotal(shift: PosDailyShiftDetail): string {
    return formatPosMoney(dailyShiftSalesTotal(shift));
  }

  partialCount(shift: PosDailyShiftDetail): number {
    return dailyShiftPartialCount(shift);
  }

  openingMxn(shift: PosDailyShiftDetail): string {
    return formatPosMoney(shift.opening_cash_mxn);
  }

  openingUsd(shift: PosDailyShiftDetail): string {
    return formatPosMoney(shift.opening_cash_usd);
  }

  partialTotal(partial: { total_mxn?: unknown; total_usd?: unknown }): string {
    const mxn = parsePosMoney(partial.total_mxn);
    const usd = parsePosMoney(partial.total_usd);
    if (usd > 0) {
      return `${formatPosMoney(mxn)} · USD ${usd.toFixed(2)}`;
    }
    return formatPosMoney(mxn);
  }
}
