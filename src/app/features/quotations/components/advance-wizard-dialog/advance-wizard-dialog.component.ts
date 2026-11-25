import { Component, Inject, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { POSService } from '../../../pos/services/pos.service';
import { QuotationService } from '../../services/quotation.service';
import { QuotationLineItem } from '../../models/quotation.model';
import { defaultStampEnvironment } from '../../../sales-orders/models/sales-order-electronic-invoice.model';
import { resolveHttpErrorMessage } from '../../../../core/utils/http-error-message.util';

export const ADVANCE_CONCEPT_SKU = 'anticipo_CFDI';

export interface AdvanceWizardLine {
  product_id: string;
  product_uom_id: string;
  quantity: number;
  unit_price: number;
  iva_percentage: number;
  ieps_percentage: number;
  discount_percentage: number;
  name: string;
  sku: string;
}

export interface AdvanceWizardData {
  mode: 'open' | 'start' | 'close';
  quotationId?: string;
  folio?: string;
  cartTotal?: number;
  cartCount?: number;
  quotationTotal?: number;
  hasRealProducts?: boolean;
  customerLabel?: string;
  customerReady?: boolean;
  missingFiscal?: string[];
  ivaPercent?: number;
  paid?: number;
  warehouseId?: string | null;
  billingBranchId?: string | null;
  lines?: AdvanceWizardLine[];
}

export interface AdvanceWizardOpenResult {
  mode: 'open' | 'start';
  advanceCase: 'unknown' | 'products';
  amount: number;
  ivaPercent: number;
}

export interface AdvanceWizardCloseResult {
  mode: 'close';
  salesOrderFolio: string;
  difference: number;
  salesOrderId: string;
}

@Component({
  selector: 'app-advance-wizard-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './advance-wizard-dialog.component.html',
  styleUrl: './advance-wizard-dialog.component.scss',
})
export class AdvanceWizardDialogComponent implements OnDestroy {
  readonly step = signal(1);
  readonly advanceCase = signal<'unknown' | 'products' | null>(null);
  readonly amountText = signal('');
  readonly error = signal('');
  readonly saving = signal(false);
  readonly lines = signal<AdvanceWizardLine[]>([]);
  readonly search = signal('');
  readonly hits = signal<AdvanceWizardLine[]>([]);
  readonly searching = signal(false);

  private readonly search$ = new Subject<string>();
  private readonly destroy$ = new Subject<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: AdvanceWizardData,
    public dialogRef: MatDialogRef<
      AdvanceWizardDialogComponent,
      AdvanceWizardOpenResult | AdvanceWizardCloseResult | undefined
    >,
    private quotations: QuotationService,
    private pos: POSService,
  ) {
    if (data.mode === 'close') {
      this.lines.set((data.lines ?? []).filter((line) => line.sku !== ADVANCE_CONCEPT_SKU));
    } else if (data.mode === 'start') {
      this.advanceCase.set(data.hasRealProducts ? 'products' : 'unknown');
      this.step.set(2);
      if (data.quotationTotal) {
        this.amountText.set(Number(data.quotationTotal).toFixed(2));
      }
    }
    this.search$.pipe(debounceTime(250), takeUntil(this.destroy$)).subscribe((term) => {
      this.runSearch(term);
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get ivaPercent(): number {
    const value = Number(this.data.ivaPercent ?? 8);
    return value === 0 || value === 16 ? value : 8;
  }

  get paid(): number {
    return roundMoney(this.data.paid ?? 0);
  }

  get saleTotal(): number {
    return roundMoney(
      this.lines().reduce((sum, line) => sum + lineTotal(line), 0),
    );
  }

  get difference(): number {
    return roundMoney(Math.max(this.saleTotal - this.paid, 0));
  }

  get shortfall(): boolean {
    return this.data.mode === 'close' && this.saleTotal + 0.009 < this.paid;
  }

  title(): string {
    if (this.data.mode === 'close') return `Venta del anticipo ${this.data.folio || ''}`.trim();
    return 'Anticipo';
  }

  choose(caseId: 'unknown' | 'products'): void {
    this.error.set('');
    if (caseId === 'products' && !(this.data.cartCount || this.data.hasRealProducts)) {
      this.error.set('Primero agrega en el punto de venta los productos que quiere.');
      return;
    }
    this.advanceCase.set(caseId);
    this.step.set(2);
    if (caseId === 'products') {
      const total = this.data.mode === 'start' ? this.data.quotationTotal : this.data.cartTotal;
      if (total) this.amountText.set(Number(total).toFixed(2));
    }
  }

  back(): void {
    if (this.data.mode === 'start') {
      this.dialogRef.close();
      return;
    }
    this.step.set(1);
    this.error.set('');
  }

  amount(): number | null {
    const value = Number(String(this.amountText()).replace(/,/g, ''));
    if (!Number.isFinite(value) || value <= 0) return null;
    return roundMoney(value);
  }

  amountError(): string {
    const amount = this.amount();
    if (amount == null) return 'Escribe el monto con IVA';
    if (!this.data.customerReady) {
      const missing = (this.data.missingFiscal ?? []).join(', ');
      return missing ? `Al cliente le falta ${missing}` : 'Elige un cliente con RFC';
    }
    const cap = this.advanceCase() === 'products'
      ? Number(this.data.mode === 'start' ? this.data.quotationTotal : this.data.cartTotal) || 0
      : 0;
    if (cap > 0 && amount - cap > 0.01) {
      return 'El anticipo no puede pasar el total de los productos';
    }
    return '';
  }

  confirmOpen(): void {
    const problem = this.amountError();
    if (problem) {
      this.error.set(problem);
      return;
    }
    const advanceCase = this.advanceCase();
    const amount = this.amount();
    if (!advanceCase || amount == null) return;
    this.dialogRef.close({
      mode: this.data.mode === 'start' ? 'start' : 'open',
      advanceCase,
      amount,
      ivaPercent: this.ivaPercent,
    });
  }

  onSearch(value: string): void {
    this.search.set(value);
    this.search$.next(value);
  }

  addHit(line: AdvanceWizardLine): void {
    this.lines.update((current) => {
      const index = current.findIndex(
        (row) => row.product_id === line.product_id && row.product_uom_id === line.product_uom_id,
      );
      if (index < 0) return [...current, { ...line, quantity: 1 }];
      return current.map((row, i) =>
        i === index ? { ...row, quantity: roundQty(row.quantity + 1) } : row,
      );
    });
    this.error.set('');
  }

  changeQty(index: number, next: number): void {
    const quantity = roundQty(next);
    if (quantity <= 0) {
      this.lines.update((current) => current.filter((_, i) => i !== index));
      return;
    }
    this.lines.update((current) =>
      current.map((row, i) => (i === index ? { ...row, quantity } : row)),
    );
  }

  confirmClose(): void {
    if (this.saving()) return;
    if (!this.lines().length) {
      this.error.set('Agrega lo que se va a llevar');
      return;
    }
    if (this.shortfall) {
      this.error.set('La venta tiene que ser igual o mayor al anticipo. El sobrante queda pendiente de definir.');
      return;
    }
    const rates = new Set(this.lines().map((line) => line.iva_percentage));
    if (rates.size > 1) {
      this.error.set('Todas las líneas tienen que llevar el mismo IVA');
      return;
    }
    const quotationId = this.data.quotationId;
    if (!quotationId) return;
    this.saving.set(true);
    this.error.set('');
    this.quotations
      .closeAdvance(quotationId, {
        environment: defaultStampEnvironment(),
        line_items: this.lines().map((line) => ({
          product_id: line.product_id,
          product_uom_id: line.product_uom_id,
          quantity: line.quantity,
          unit_price: line.unit_price,
          iva_percentage: line.iva_percentage,
          ieps_percentage: line.ieps_percentage,
          discount_percentage: line.discount_percentage,
        })),
      })
      .subscribe({
        next: (result) => {
          this.saving.set(false);
          this.dialogRef.close({
            mode: 'close',
            salesOrderFolio: result.sales_order?.folio || 'OV',
            difference: Number(result.difference || 0),
            salesOrderId: result.sales_order?.id,
          });
        },
        error: (error: unknown) => {
          this.saving.set(false);
          this.error.set(resolveHttpErrorMessage(error, 'No se pudo generar la venta'));
        },
      });
  }

  money(value: number): string {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(
      Number.isFinite(value) ? value : 0,
    );
  }

  private runSearch(term: string): void {
    const query = term.trim();
    if (query.length < 2) {
      this.hits.set([]);
      return;
    }
    this.searching.set(true);
    this.pos
      .getPosInventorySummary({
        search: query,
        warehouse_id: this.data.warehouseId || undefined,
        billing_branch_id: this.data.billingBranchId || undefined,
        limit: 12,
      })
      .subscribe({
        next: (summary) => {
          this.searching.set(false);
          const rows = Array.isArray(summary.data) ? summary.data : [];
          this.hits.set(
            rows
              .map((row) => toWizardLine(row))
              .filter((line): line is AdvanceWizardLine => !!line && line.sku !== ADVANCE_CONCEPT_SKU),
          );
        },
        error: () => {
          this.searching.set(false);
          this.hits.set([]);
        },
      });
  }
}

function lineTotal(line: AdvanceWizardLine): number {
  const gross = line.quantity * line.unit_price;
  const discount = gross * (Number(line.discount_percentage || 0) / 100);
  const taxable = Math.max(gross - discount, 0);
  const iva = taxable * (Number(line.iva_percentage || 0) / 100);
  const ieps = taxable * (Number(line.ieps_percentage || 0) / 100);
  return taxable + iva + ieps;
}

function roundMoney(value: number): number {
  return Math.round((Number(value) || 0) * 100) / 100;
}

function roundQty(value: number): number {
  return Math.round((Number(value) || 0) * 1000) / 1000;
}

export function wizardLinesFromQuotation(lines: QuotationLineItem[]): AdvanceWizardLine[] {
  return (lines ?? [])
    .filter((line) => line.product?.sku !== ADVANCE_CONCEPT_SKU)
    .map((line) => ({
      product_id: line.product_id,
      product_uom_id: line.product_uom_id,
      quantity: Number(line.quantity) || 0,
      unit_price: Number(line.unit_price) || 0,
      iva_percentage: Number(line.iva_percentage) || 0,
      ieps_percentage: Number(line.ieps_percentage) || 0,
      discount_percentage: Number(line.discount_percentage) || 0,
      name: line.product?.name || 'Producto',
      sku: line.product?.sku || '',
    }))
    .filter((line) => line.product_id && line.product_uom_id && line.quantity > 0);
}

function toWizardLine(row: unknown): AdvanceWizardLine | null {
  if (!row || typeof row !== 'object') return null;
  const record = row as Record<string, unknown>;
  const productId = String(record['product_id'] || record['id'] || '');
  const uomId = String(record['product_uom_id'] || record['uom_id'] || '');
  if (!productId || !uomId) return null;
  const price = Number(record['suggested_unit_price'] ?? record['cost'] ?? 0);
  return {
    product_id: productId,
    product_uom_id: uomId,
    quantity: 1,
    unit_price: Number.isFinite(price) ? price : 0,
    iva_percentage: Number(record['suggested_iva_percentage'] ?? 8) || 0,
    ieps_percentage: Number(record['suggested_ieps_percentage'] ?? 0) || 0,
    discount_percentage: 0,
    name: String(record['product_name'] || record['name'] || 'Producto'),
    sku: String(record['product_sku'] || record['sku'] || ''),
  };
}
