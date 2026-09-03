import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  PosDailyShiftDetail,
  PosDailyShiftPartial,
  dailyShiftBranchLabel,
  dailyShiftIsOpen,
  dailyShiftPartialCount,
  dailyShiftRemovedTotal,
  dailyShiftSalesTotal,
  dailyShiftStatusLabel,
  dailyShiftTerminalLabel,
  expectedCashInDrawer,
  formatPosMoney,
  partialPerformedByLabel,
  partialShiftSequence,
  partialShiftTotalLabel,
  parsePosMoney,
} from '../../../pos/models/pos-daily-shift.model';
import { POSService } from '../../../pos/services/pos.service';
import { mapPosApiErrorMessage } from '../../../pos/constants/pos-api-errors';
import {
  CloseDailyShiftDialogComponent,
  CloseDailyShiftDialogData,
  CloseDailyShiftDialogResult,
} from '../../../pos/components/close-daily-shift-dialog/close-daily-shift-dialog.component';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { SpinnerComponent } from '../../../../core/components/spinner/spinner.component';
import { CustomSnackbarComponent } from '../../../../core/components/custom-snackbar/custom-snackbar.component';

export interface PosDailyShiftDetailModalResult {
  closed?: boolean;
}

@Component({
  selector: 'app-pos-daily-shift-detail-modal',
  standalone: true,
  imports: [CommonModule, ButtonComponent, SpinnerComponent],
  templateUrl: './pos-daily-shift-detail-modal.component.html',
  styleUrl: './pos-daily-shift-detail-modal.component.scss',
})
export class PosDailyShiftDetailModalComponent {
  loading = signal(true);
  closing = signal(false);
  shift = signal<PosDailyShiftDetail | null>(null);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { shiftId: string },
    private dialogRef: MatDialogRef<PosDailyShiftDetailModalComponent, PosDailyShiftDetailModalResult>,
    private posService: POSService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.loadShift();
  }

  dismiss(): void {
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

  removedTotal(shift: PosDailyShiftDetail): string {
    return formatPosMoney(dailyShiftRemovedTotal(shift));
  }

  openingMxn(shift: PosDailyShiftDetail): string {
    return formatPosMoney(shift.opening_cash_mxn);
  }

  openingUsd(shift: PosDailyShiftDetail): string {
    return formatPosMoney(shift.opening_cash_usd);
  }

  formatDrawer(value: number | string | null | undefined): string {
    return formatPosMoney(value);
  }

  differenceLabel(value: number | string | null | undefined): string {
    const diff = parsePosMoney(value);
    if (diff > 0.009) {
      return `Sobrante ${formatPosMoney(diff)}`;
    }
    if (diff < -0.009) {
      return `Faltante ${formatPosMoney(Math.abs(diff))}`;
    }
    return `Cuadra ${formatPosMoney(0)}`;
  }

  partialTotal(partial: Parameters<typeof partialShiftTotalLabel>[0]): string {
    return partialShiftTotalLabel(partial);
  }

  partialNumber(partial: Parameters<typeof partialShiftSequence>[0], index: number): number {
    return partialShiftSequence(partial, index);
  }

  partialPerformedBy(partial: PosDailyShiftPartial, shift: PosDailyShiftDetail): string {
    return partialPerformedByLabel(partial, shift.terminal_user);
  }

  formatPartialDate(value?: string): string {
    if (!value) {
      return '—';
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return value;
    }
    return new Intl.DateTimeFormat('es-MX', {
      dateStyle: 'short',
      timeStyle: 'short',
    }).format(date);
  }

  closeDailyShift(): void {
    const shift = this.shift();
    if (!shift?.id || !this.isOpen(shift) || this.closing()) {
      return;
    }

    const drawer = shift.cash_drawer;
    const openingMxn = parsePosMoney(drawer?.opening_cash_mxn ?? shift.opening_cash_mxn);
    const openingUsd = parsePosMoney(drawer?.opening_cash_usd ?? shift.opening_cash_usd);
    const collectedCashMxn = parsePosMoney(drawer?.collected_cash_mxn);
    const collectedCashUsd = parsePosMoney(drawer?.collected_cash_usd);
    const removedMxn = parsePosMoney(drawer?.removed_total_mxn ?? dailyShiftRemovedTotal(shift));
    const removedUsd = parsePosMoney(drawer?.removed_total_usd);

    const dialogRef = this.dialog.open(CloseDailyShiftDialogComponent, {
      width: '520px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      disableClose: true,
      panelClass: 'pos-dialog-panel',
      data: {
        shiftDate: shift.shift_date,
        branchLabel: this.branchLabel(shift),
        openingCashMxn: openingMxn,
        openingCashUsd: openingUsd,
        collectedCashMxn,
        collectedCashUsd,
        collectedTransferMxn: parsePosMoney(drawer?.collected_transfer_mxn),
        collectedCardMxn: parsePosMoney(drawer?.collected_card_mxn),
        collectedCreditMxn: parsePosMoney(drawer?.collected_credit_mxn),
        removedMxn,
        removedUsd,
        expectedCashMxn: expectedCashInDrawer(openingMxn, collectedCashMxn, removedMxn),
        expectedCashUsd: expectedCashInDrawer(openingUsd, collectedCashUsd, removedUsd),
        partialCount: this.partialCount(shift),
        pendingCount: 0,
        isHistorical: this.isHistoricalShift(shift),
      } satisfies CloseDailyShiftDialogData,
    });

    dialogRef.afterClosed().subscribe((result: CloseDailyShiftDialogResult | undefined) => {
      if (!result) {
        return;
      }
      this.closing.set(true);
      this.posService.closeDailyShift(shift.id, result).subscribe({
        next: () => {
          this.closing.set(false);
          this.showSuccess('Corte cerrado correctamente');
          this.dialogRef.close({ closed: true });
        },
        error: (error) => {
          this.closing.set(false);
          this.showError(mapPosApiErrorMessage(error.error?.message));
        },
      });
    });
  }

  private loadShift(): void {
    this.loading.set(true);
    this.posService.getDailyShift(this.data.shiftId).subscribe({
      next: (shift) => {
        this.shift.set(shift);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  private isHistoricalShift(shift: PosDailyShiftDetail): boolean {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return shift.shift_date !== `${yyyy}-${mm}-${dd}`;
  }

  private showSuccess(message: string): void {
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      data: { message, type: 'success' },
      duration: 4000,
    });
  }

  private showError(message: string): void {
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      data: { message, type: 'error' },
      duration: 5000,
    });
  }
}
