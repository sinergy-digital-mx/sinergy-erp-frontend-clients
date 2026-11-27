import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ButtonComponent } from '../../../../core/components/button/button.component';

export interface SellerCodeDialogData {
  title?: string;
  subtitle?: string;
}

@Component({
  selector: 'app-seller-code-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './seller-code-dialog.component.html',
  styleUrl: './seller-code-dialog.component.scss',
})
export class SellerCodeDialogComponent {
  private readonly data = inject(MAT_DIALOG_DATA, { optional: true }) as SellerCodeDialogData | null;
  readonly title = this.data?.title ?? 'Código de vendedor';
  readonly subtitle = this.data?.subtitle ?? 'Ingresa tu código para registrar ventas en esta terminal.';
  code = signal<number | null>(null);
  error = signal<string | null>(null);

  constructor(private dialogRef: MatDialogRef<SellerCodeDialogComponent>) {}

  cancel(): void {
    this.dialogRef.close();
  }

  confirm(): void {
    const value = this.code();
    if (value == null || !Number.isInteger(value) || value < 1) {
      this.error.set('Ingresa un código numérico válido');
      return;
    }
    this.dialogRef.close(value);
  }
}
