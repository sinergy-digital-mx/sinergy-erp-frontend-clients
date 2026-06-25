import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ButtonComponent } from '../../../../core/components/button/button.component';

@Component({
  selector: 'app-close-daily-shift-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './close-daily-shift-dialog.component.html',
  styleUrl: './close-daily-shift-dialog.component.scss',
})
export class CloseDailyShiftDialogComponent {
  notes = signal('');

  constructor(private dialogRef: MatDialogRef<CloseDailyShiftDialogComponent>) {}

  cancel(): void {
    this.dialogRef.close();
  }

  confirm(): void {
    this.dialogRef.close({ notes: this.notes().trim() || undefined });
  }
}
