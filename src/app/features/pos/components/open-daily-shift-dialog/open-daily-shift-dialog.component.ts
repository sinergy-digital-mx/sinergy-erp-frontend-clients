import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ButtonComponent } from '../../../../core/components/button/button.component';

export interface OpenDailyShiftDialogResult {
  opening_cash_mxn: number;
  opening_cash_usd: number;
  notes?: string;
}

@Component({
  selector: 'app-open-daily-shift-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './open-daily-shift-dialog.component.html',
  styleUrl: './open-daily-shift-dialog.component.scss',
})
export class OpenDailyShiftDialogComponent {
  openingCashMxn = signal(1500);
  openingCashUsd = signal(0);
  notes = signal('');

  constructor(private dialogRef: MatDialogRef<OpenDailyShiftDialogComponent>) {}

  cancel(): void {
    this.dialogRef.close();
  }

  confirm(): void {
    const mxn = Number(this.openingCashMxn());
    const usd = Number(this.openingCashUsd());
    if (!Number.isFinite(mxn) || mxn < 0 || !Number.isFinite(usd) || usd < 0) {
      return;
    }
    this.dialogRef.close({
      opening_cash_mxn: mxn,
      opening_cash_usd: usd,
      notes: this.notes().trim() || undefined,
    } satisfies OpenDailyShiftDialogResult);
  }
}
