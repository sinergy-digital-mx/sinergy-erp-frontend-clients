import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export interface ConfirmDialogData {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDangerous?: boolean;
}

/**
 * ConfirmDialogComponent
 * Reusable confirmation dialog for user actions
 * 
 * Usage:
 * this.dialog.open(ConfirmDialogComponent, {
 *   data: {
 *     title: 'Delete Role',
 *     message: 'Are you sure you want to delete this role?',
 *     confirmText: 'Delete',
 *     cancelText: 'Cancel',
 *     isDangerous: true
 *   }
 * }).afterClosed().subscribe(result => {
 *   if (result) {
 *     // User confirmed
 *   }
 * });
 */
@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  template: `
    <div class="p-6">
      <!-- Title -->
      <h2 class="text-lg font-semibold text-gray-900 mb-2">{{ data.title }}</h2>
      
      <!-- Message -->
      <p class="text-sm text-gray-600 mb-6">{{ data.message }}</p>
      
      <!-- Buttons -->
      <div class="flex gap-3 justify-end">
        <button
          mat-button
          (click)="onCancel()"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded transition-colors"
        >
          {{ data.cancelText || 'Cancel' }}
        </button>
        <button
          mat-button
          (click)="onConfirm()"
          [class]="data.isDangerous ? 'bg-red-600 hover:bg-red-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'"
          class="px-4 py-2 text-sm font-medium rounded transition-colors"
        >
          {{ data.confirmText || 'Confirm' }}
        </button>
      </div>
    </div>
  `,
  styles: []
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
