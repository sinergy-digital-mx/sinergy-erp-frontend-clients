import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ButtonComponent } from '../../../../core/components/button/button.component';

export interface CloseDailyShiftDialogData {
  shiftDate: string;
  branchLabel: string;
  openingMxn: string;
  openingUsd?: string;
  salesTotal: string;
  partialCount: number;
  removedTotal: string;
  pendingCount: number;
  isHistorical?: boolean;
}

@Component({
  selector: 'app-close-daily-shift-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './close-daily-shift-dialog.component.html',
  styleUrl: './close-daily-shift-dialog.component.scss',
})
export class CloseDailyShiftDialogComponent {
  notes = signal('');

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CloseDailyShiftDialogData,
    private dialogRef: MatDialogRef<CloseDailyShiftDialogComponent>
  ) {}

  cancel(): void {
    this.dialogRef.close();
  }

  confirm(): void {
    this.dialogRef.close({ notes: this.notes().trim() || undefined });
  }
}
