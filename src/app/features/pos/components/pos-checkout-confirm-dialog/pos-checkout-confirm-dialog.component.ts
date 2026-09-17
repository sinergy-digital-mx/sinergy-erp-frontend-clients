import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LucideAngularModule, FileText, ShoppingCart } from 'lucide-angular';

export type PosCheckoutKind = 'sale' | 'quote';

export interface PosCheckoutConfirmDialogData {
  kind: PosCheckoutKind;
  title: string;
  subtitle: string;
  totalLabel: string;
  itemSummary: string;
  customerLabel?: string;
  acceptLabel: string;
  queued?: boolean;
}

export type PosCheckoutConfirmResult = boolean | { notes: string };

@Component({
  selector: 'app-pos-checkout-confirm-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './pos-checkout-confirm-dialog.component.html',
  styleUrl: './pos-checkout-confirm-dialog.component.scss',
})
export class PosCheckoutConfirmDialogComponent {
  readonly ShoppingCart = ShoppingCart;
  readonly FileText = FileText;
  notesText = signal('');

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PosCheckoutConfirmDialogData,
    private dialogRef: MatDialogRef<PosCheckoutConfirmDialogComponent, PosCheckoutConfirmResult>
  ) {}

  isQuote(): boolean {
    return this.data.kind === 'quote';
  }

  icon() {
    return this.isQuote() ? this.FileText : this.ShoppingCart;
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  confirm(): void {
    if (this.isQuote()) {
      this.dialogRef.close({ notes: this.notesText().trim() });
      return;
    }
    this.dialogRef.close(true);
  }
}
