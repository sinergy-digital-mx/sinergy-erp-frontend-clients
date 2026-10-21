import { Component, Inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { LucideAngularModule, FileText, ShoppingCart } from 'lucide-angular';
import {
  CFDI_REGIMEN_RECEPTOR_OPTIONS,
  CFDI_USO_OPTIONS,
} from '../../../sales-orders/models/sales-order-electronic-invoice.model';

export type PosCheckoutKind = 'sale' | 'quote';

export interface PosCheckoutCustomerFiscal {
  ready: boolean;
  missing: string[];
  /** Datos fiscales actuales del cliente para mostrarlos en el diálogo. */
  rfc?: string;
  razonSocial?: string;
  postalCode?: string;
  /** Código de régimen del receptor (612 física, 601 moral). */
  regimen?: string;
}

/** Cliente seleccionado más sus datos fiscales, tras editarlo o cambiarlo desde el diálogo. */
export interface PosCheckoutCustomerSnapshot {
  label: string;
  fiscal: PosCheckoutCustomerFiscal | null;
}

export interface PosCheckoutCustomerActions {
  /** Abre la edición del cliente (pestaña fiscal) y devuelve los datos actualizados. */
  edit: () => Observable<PosCheckoutCustomerSnapshot | null>;
  /** Abre el selector de cliente y devuelve el cliente elegido. */
  change: () => Observable<PosCheckoutCustomerSnapshot | null>;
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
  customerActions?: PosCheckoutCustomerActions;
  acceptLabel: string;
  queued?: boolean;
}

export interface PosCheckoutQuoteResult {
  notes: string;
  advanceAmount: number | null;
  advanceUsoCfdi: string | null;
  advanceMetodoPago: 'PUE' | 'PPD' | null;
}

export type PosCheckoutConfirmResult = boolean | PosCheckoutQuoteResult;

const GENERIC_RFCS = new Set(['XAXX010101000', 'XEXX010101000']);

/** Resume los datos fiscales que exige el CFDI de anticipo. */
export function buildCustomerFiscalSnapshot(customer: any): PosCheckoutCustomerFiscal {
  const rfc = String(customer?.fiscal_rfc ?? '').replace(/[\s-]/g, '').toUpperCase();
  const razon = String(customer?.fiscal_razon_social ?? '').trim();
  const postal = String(customer?.fiscal_postal_code ?? '').trim();
  const missing: string[] = [];
  const hasRfc = !!rfc && !GENERIC_RFCS.has(rfc);
  if (!hasRfc) missing.push('RFC');
  if (!razon) missing.push('Razón social');
  if (!/^\d{5}$/.test(postal)) missing.push('Código postal fiscal');
  const person = String(customer?.fiscal_person_type ?? '').trim().toLowerCase();
  const regimen = person === 'fisica' || rfc.length === 13 ? '612' : '601';
  return {
    ready: missing.length === 0,
    missing,
    rfc: hasRfc ? rfc : '',
    razonSocial: razon,
    postalCode: postal,
    regimen,
  };
}

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
  readonly usoOptions = CFDI_USO_OPTIONS;
  readonly quickPercents = [30, 50, 100];

  notesText = signal('');
  advanceInvoice = signal(false);
  advanceAmountText = signal('');
  usoCfdi = signal('G03');
  metodoPago = signal<'PUE' | 'PPD'>('PUE');
  customerLabel = signal('');
  customerFiscal = signal<PosCheckoutCustomerFiscal | null>(null);
  customerBusy = signal(false);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PosCheckoutConfirmDialogData,
    private dialogRef: MatDialogRef<PosCheckoutConfirmDialogComponent, PosCheckoutConfirmResult>,
  ) {
    const total = Number(data.cartTotal ?? 0);
    if (total > 0) {
      this.advanceAmountText.set(total.toFixed(2));
    }
    this.customerLabel.set(data.customerLabel ?? '');
    this.customerFiscal.set(data.customerFiscal ?? null);
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

  formatMoney(amount: number): string {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(amount || 0);
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

  setPercent(percent: number): void {
    const total = this.cartTotal();
    if (total <= 0) return;
    const amount = Math.round(((total * percent) / 100 + Number.EPSILON) * 100) / 100;
    this.advanceAmountText.set(amount.toFixed(2));
  }

  isPercentActive(percent: number): boolean {
    const total = this.cartTotal();
    const amount = this.advanceAmount();
    if (total <= 0 || amount == null) return false;
    return Math.abs(amount - Math.round(((total * percent) / 100 + Number.EPSILON) * 100) / 100) < 0.01;
  }

  advanceAmountError(): string | null {
    if (!this.advanceInvoice()) return null;
    const amount = this.advanceAmount();
    const total = this.cartTotal();
    if (amount == null || amount <= 0) return 'Escribe el monto del anticipo';
    if (total > 0 && amount - total > 0.01) return 'No puede ser mayor al total de la cotización';
    return null;
  }

  remainingTotal(): number {
    const amount = this.advanceAmount() ?? 0;
    return Math.max(0, Math.round((this.cartTotal() - amount + Number.EPSILON) * 100) / 100);
  }

  hasCustomer(): boolean {
    return !!this.customerFiscal();
  }

  fiscalReady(): boolean {
    return this.customerFiscal()?.ready === true;
  }

  regimenLabel(): string {
    const code = this.customerFiscal()?.regimen ?? '';
    return CFDI_REGIMEN_RECEPTOR_OPTIONS.find((option) => option.id === code)?.name ?? code;
  }

  canEditCustomer(): boolean {
    return !!this.data.customerActions && this.hasCustomer();
  }

  editCustomer(): void {
    this.runCustomerAction(this.data.customerActions?.edit);
  }

  changeCustomer(): void {
    this.runCustomerAction(this.data.customerActions?.change);
  }

  private runCustomerAction(action?: () => Observable<PosCheckoutCustomerSnapshot | null>): void {
    if (!action || this.customerBusy()) return;
    this.customerBusy.set(true);
    action().subscribe({
      next: (snapshot) => {
        this.customerBusy.set(false);
        if (!snapshot) return;
        this.customerLabel.set(snapshot.label);
        this.customerFiscal.set(snapshot.fiscal);
      },
      error: () => this.customerBusy.set(false),
    });
  }

  acceptLabel(): string {
    if (this.isQuote() && this.advanceInvoice()) {
      return 'Guardar y mandar anticipo a caja';
    }
    return this.data.acceptLabel;
  }

  canConfirm(): boolean {
    if (!this.isQuote() || !this.advanceInvoice()) return true;
    return this.fiscalReady() && !this.advanceAmountError() && !this.customerBusy();
  }

  toggleAdvance(checked: boolean): void {
    this.advanceInvoice.set(checked);
  }

  confirm(): void {
    if (this.isQuote()) {
      if (!this.canConfirm()) return;
      const advance = this.advanceInvoice();
      this.dialogRef.close({
        notes: this.notesText().trim(),
        advanceAmount: advance ? this.advanceAmount() : null,
        advanceUsoCfdi: advance ? this.usoCfdi() : null,
        advanceMetodoPago: advance ? this.metodoPago() : null,
      });
      return;
    }
    this.dialogRef.close(true);
  }
}
