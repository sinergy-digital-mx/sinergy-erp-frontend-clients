import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LucideAngularModule, AlertTriangle } from 'lucide-angular';
import { UnclosedShiftAlert } from '../../models/pos-daily-shift.model';

export type UnclosedDailyShiftDialogMode = 'ventas' | 'cobranza';

export interface UnclosedDailyShiftDialogData {
  alert: UnclosedShiftAlert;
  mode: UnclosedDailyShiftDialogMode;
  onCloseShift?: () => void;
}

@Component({
  selector: 'app-unclosed-daily-shift-dialog',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './unclosed-daily-shift-dialog.component.html',
  styleUrl: './unclosed-daily-shift-dialog.component.scss',
})
export class UnclosedDailyShiftDialogComponent {
  readonly AlertTriangle = AlertTriangle;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: UnclosedDailyShiftDialogData,
    private dialogRef: MatDialogRef<UnclosedDailyShiftDialogComponent>
  ) {}

  isCobranza(): boolean {
    return this.data.mode === 'cobranza';
  }

  acknowledge(): void {
    this.dialogRef.close(true);
  }

  goToClose(): void {
    this.data.onCloseShift?.();
  }
}
