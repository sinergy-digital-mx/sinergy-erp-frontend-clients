import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LucideAngularModule, FileText, ShoppingCart } from 'lucide-angular';

export type PosCheckoutKind = 'sale' | 'quote';

export interface PosCheckoutCustomerFiscal {
  ready: boolean;
  missing: string[];
}

export interface PosCheckoutConfirmDialogData {
  kind: PosCheckoutKind;
  title: string;
  subtitle: string;
  totalLabel: string;
  /** Total con IVA de la cotización. El anticipo puede ser menor. */
  cartTotal?: number;
  itemSummary: string;
  customerLabel?: string;
  customerFiscal?: PosCheckoutCustomerFiscal;
  acceptLabel: string;
  queued?: boolean;
}

export type PosCheckoutConfirmResult =
  | boolean
  | { notes: string; advanceAmount: number | null };

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
  advanceInvoice = signal(false);
  advanceAmountText = signal('');

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PosCheckoutConfirmDialogData,
    private dialogRef: MatDialogRef<PosCheckoutConfirmDialogComponent, PosCheckoutConfirmResult>
  ) {
    const total = Number(data.cartTotal ?? 0);
    if (total > 0) {
      this.advanceAmountText.set(total.toFixed(2));
    }
  }

  isQuote(): boolean {
    return this.data.kind === 'quote';
  }

  icon() {
    return this.isQuote() ? this.FileText : this.ShoppingCart;
  }

  cancel(): void {
    this.dialogRef.close(false);
  }

  cartTotal(): number {
    return Math.round((Number(this.data.cartTotal ?? 0) + Number.EPSILON) * 100) / 100;
  }

  onAdvanceAmount(value: string | number | null): void {
    this.advanceAmountText.set(value == null ? '' : String(value));
  }

  advanceAmount(): number | null {
    const raw = String(this.advanceAmountText() ?? '').trim().replace(',', '.');
    if (!raw) return null;
    const value = Number(raw);
    if (!Number.isFinite(value)) return null;
    return Math.round((value + Number.EPSILON) * 100) / 100;
  }

  advanceAmountError(): string | null {
    if (!this.advanceInvoice()) return null;
    const amount = this.advanceAmount();
    const total = this.cartTotal();
    if (amount == null || amount <= 0) return 'Escribe el monto del anticipo';
    if (total > 0 && amount - total > 0.01) return 'No puede ser mayor al total de la cotización';
    return null;
  }

  fiscalReady(): boolean {
    return this.data.customerFiscal?.ready === true;
  }

  canConfirm(): boolean {
    if (!this.isQuote() || !this.advanceInvoice()) return true;
    return this.fiscalReady() && !this.advanceAmountError();
  }

  toggleAdvance(checked: boolean): void {
    this.advanceInvoice.set(checked);
  }

  confirm(): void {
    if (this.isQuote()) {
      if (!this.canConfirm()) return;
      this.dialogRef.close({
        notes: this.notesText().trim(),
        advanceAmount: this.advanceInvoice() ? this.advanceAmount() : null,
      });
      return;
    }
    this.dialogRef.close(true);
  }
}
