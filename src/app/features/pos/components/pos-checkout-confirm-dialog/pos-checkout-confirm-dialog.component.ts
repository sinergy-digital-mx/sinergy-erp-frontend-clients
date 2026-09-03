import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LucideAngularModule, FileText, ShoppingCart } from 'lucide-angular';

export type PosCheckoutKind = 'sale' | 'quote';

export interface PosCheckoutConfirmDialogData {
  kind: PosCheckoutKind;
  title: string;
  subtitle: string;
  totalLabel: string;
  itemSummary: string;
  acceptLabel: string;
  queued?: boolean;
}

@Component({
  selector: 'app-pos-checkout-confirm-dialog',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './pos-checkout-confirm-dialog.component.html',
  styleUrl: './pos-checkout-confirm-dialog.component.scss',
})
export class PosCheckoutConfirmDialogComponent {
  readonly ShoppingCart = ShoppingCart;
  readonly FileText = FileText;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PosCheckoutConfirmDialogData,
    private dialogRef: MatDialogRef<PosCheckoutConfirmDialogComponent, boolean>
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
    this.dialogRef.close(true);
  }
}
