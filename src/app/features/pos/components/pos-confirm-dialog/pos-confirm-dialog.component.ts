import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LucideAngularModule, Undo2 } from 'lucide-angular';

export interface PosConfirmDialogData {
  title: string;
  message: string;
  note?: string;
  cancelLabel?: string;
  acceptLabel: string;
}

@Component({
  selector: 'app-pos-confirm-dialog',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './pos-confirm-dialog.component.html',
  styleUrl: './pos-confirm-dialog.component.scss',
})
export class PosConfirmDialogComponent {
  readonly Undo2 = Undo2;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PosConfirmDialogData,
    private dialogRef: MatDialogRef<PosConfirmDialogComponent, boolean>
  ) {}

  cancel(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    this.dialogRef.close(true);
  }
}
