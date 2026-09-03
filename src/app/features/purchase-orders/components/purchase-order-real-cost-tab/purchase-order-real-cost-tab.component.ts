import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastService } from '../../../../core/services/toast.service';
import { ExchangeRateService } from '../../../../core/services/exchange-rate.service';
import { resolveHttpErrorMessage } from '../../../../core/utils/http-error-message.util';
import {
  PaymentCurrency,
  PurchaseOrder,
  PurchaseOrderExtraCost,
  UpdatePurchaseOrderRealCostPayload,
} from '../../models/purchase-order.model';
import { LineItem } from '../../models/line-item.model';
import { PurchaseOrderService } from '../../services/purchase-order.service';
import {
  formatPurchaseOrderUnitCost,
  parsePurchaseOrderDecimal,
} from '../../utils/purchase-order-display.util';
import {
  convertExtraAmount,
  previewPurchaseOrderRealCost,
  RealCostPreview,
  RealCostPreviewLine,
} from '../../utils/purchase-order-real-cost-preview.util';

/** Conceptos de la hoja Encino. Quedan listos y vacíos; no se guardan si no hay monto. */
const DEFAULT_EXTRA_CONCEPTS = [
  'DTA',
  'Prevalidación',
  'Derechos',
  'Honorarios',
  'Corresponsalía',
  'Liberación BL',
  'Maniobra tarimas tratadas OMG',
  'Flete terrestre',
  'Unload & Reload OMG',
] as const;

interface ExtraCostDraft {
  uid: string;
  concept: string;
  mxn: number | null;
  usd: number | null;
  lastEdited: PaymentCurrency;
  preset: boolean;
}

@Component({
  selector: 'app-purchase-order-real-cost-tab',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './purchase-order-real-cost-tab.component.html',
  styleUrl: './purchase-order-real-cost-tab.component.scss',
})
export class PurchaseOrderRealCostTabComponent implements OnChanges {
  private readonly purchaseOrderService = inject(PurchaseOrderService);
  private readonly exchangeRateService = inject(ExchangeRateService);
  private readonly toast = inject(ToastService);

  @Input({ required: true }) order!: PurchaseOrder;
  @Output() saved = new EventEmitter<PurchaseOrder>();

  readonly extras = signal<ExtraCostDraft[]>([]);
  readonly igiByLineId = signal<Record<string, number | null>>({});
  readonly saving = signal(false);
  readonly clearing = signal(false);

  customsDate = '';
  customsExchangeRate: number | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['order'] && this.order) {
      this.hydrate(this.order);
    }
  }

  canEdit(): boolean {
    if (typeof this.order.can_edit_real_cost === 'boolean') {
      return this.order.can_edit_real_cost;
    }
    const status = this.order.general_status ?? this.order.status;
    return status === 'Creada' || status === 'Recibida' || status === 'En Proceso';
  }

  paymentCurrency(): PaymentCurrency {
    return this.order.payment_currency === 'USD' ? 'USD' : 'MXN';
  }

  preview(): RealCostPreview {
    const rate = this.optionalNumber(this.customsExchangeRate);
    return previewPurchaseOrderRealCost({
      payment_currency: this.paymentCurrency(),
      customs_exchange_rate: rate,
      lines: this.lineItems().map((item) => ({
        id: item.id,
        quantity: this.lineQuantity(item),
        vendor_unit_cost: this.vendorUnitCost(item),
        igi_percentage: Number(this.lineIgi(item) ?? 0),
      })),
      extras: this.extras()
        .map((row) => this.extraForPreview(row, rate))
        .filter((row): row is { amount: number; currency: PaymentCurrency } => row != null),
    });
  }

  previewLine(item: LineItem): RealCostPreviewLine | undefined {
    return this.preview().lines.find((line) => line.id === item.id);
  }

  incrementPercentage(): number {
    return this.preview().increment_percentage;
  }

  extrasMxn(): number {
    return this.preview().extras_mxn;
  }

  merchandiseUsd(): number | null {
    return this.preview().merchandise_usd;
  }

  merchandiseMxn(): number | null {
    return this.preview().merchandise_mxn;
  }

  realImporteTotalMxn(): number {
    return this.preview().lines.reduce((sum, line) => sum + (line.real_importe_mxn ?? 0), 0);
  }

  vendorImporteTotal(): number {
    return this.lineItems().reduce((sum, item) => sum + this.lineVendorImporte(item), 0);
  }

  quantityTotal(): number {
    return this.lineItems().reduce((sum, item) => sum + this.lineQuantity(item), 0);
  }

  lineItems(): LineItem[] {
    return this.order.line_items ?? [];
  }

  lineQuantity(item: LineItem): number {
    const received = parsePurchaseOrderDecimal(item.received_original_quantity);
    if (received > 0) {
      return received;
    }
    return Math.max(parsePurchaseOrderDecimal(item.quantity), 0);
  }

  lineVendorImporte(item: LineItem): number {
    return this.lineQuantity(item) * this.vendorUnitCost(item);
  }

  productName(item: LineItem): string {
    return item.product?.name?.trim() || 'N/A';
  }

  productSku(item: LineItem): string {
    return item.product?.sku?.trim() || '';
  }

  vendorUnitCost(item: LineItem): number {
    return parsePurchaseOrderDecimal(item.unit_total ?? item.unit_price);
  }

  lineIgi(item: LineItem): number | null {
    return this.igiByLineId()[item.id] ?? this.optionalNumber(item.igi_percentage) ?? 0;
  }

  setLineIgi(item: LineItem, value: number | null): void {
    this.igiByLineId.update((current) => ({ ...current, [item.id]: value }));
  }

  addExtra(): void {
    if (!this.canEdit() || this.extras().length >= 80) {
      return;
    }
    this.extras.update((rows) => [
      ...rows,
      {
        uid: this.nextUid(),
        concept: '',
        mxn: null,
        usd: null,
        lastEdited: 'MXN',
        preset: false,
      },
    ]);
  }

  removeExtra(uid: string): void {
    if (!this.canEdit()) {
      return;
    }
    this.extras.update((rows) => rows.filter((row) => row.uid !== uid || row.preset));
  }

  setExtraConcept(uid: string, concept: string): void {
    this.extras.update((rows) =>
      rows.map((row) => (row.uid === uid ? { ...row, concept } : row))
    );
  }

  setExtraAmount(uid: string, currency: PaymentCurrency, value: number | null): void {
    const rate = this.optionalNumber(this.customsExchangeRate);
    this.extras.update((rows) =>
      rows.map((row) => {
        if (row.uid !== uid) {
          return row;
        }
        if (currency === 'MXN') {
          return {
            ...row,
            lastEdited: 'MXN',
            mxn: value,
            usd: convertExtraAmount(value, 'MXN', 'USD', rate),
          };
        }
        return {
          ...row,
          lastEdited: 'USD',
          usd: value,
          mxn: convertExtraAmount(value, 'USD', 'MXN', rate),
        };
      })
    );
  }

  onCustomsRateChange(): void {
    const rate = this.optionalNumber(this.customsExchangeRate);
    this.extras.update((rows) =>
      rows.map((row) => {
        if (row.lastEdited === 'USD') {
          return { ...row, mxn: convertExtraAmount(row.usd, 'USD', 'MXN', rate) };
        }
        return { ...row, usd: convertExtraAmount(row.mxn, 'MXN', 'USD', rate) };
      })
    );
  }

  save(): void {
    if (!this.canEdit() || this.saving() || this.clearing()) {
      return;
    }

    const extras = this.buildExtrasPayload();
    if (extras === null) {
      return;
    }

    this.saving.set(true);
    this.purchaseOrderService.updateRealCost(this.order.id, this.buildPayload(extras)).subscribe({
      next: (updated) => {
        this.saving.set(false);
        this.toast.success('Costo real guardado');
        this.saved.emit(updated);
      },
      error: (error) => {
        this.saving.set(false);
        this.toast.error(resolveHttpErrorMessage(error, 'No se pudo guardar el costo real'));
      },
    });
  }

  clearRealCost(): void {
    if (!this.canEdit() || this.saving() || this.clearing()) {
      return;
    }

    this.clearing.set(true);
    this.purchaseOrderService
      .updateRealCost(this.order.id, {
        customs_date: null,
        customs_exchange_rate: null,
        extra_costs: [],
      })
      .subscribe({
        next: (updated) => {
          this.clearing.set(false);
          this.toast.success('Costo real quitado');
          this.saved.emit(updated);
        },
        error: (error) => {
          this.clearing.set(false);
          this.toast.error(resolveHttpErrorMessage(error, 'No se pudo quitar el costo real'));
        },
      });
  }

  formatUnitCost(value: number | string | null | undefined): string {
    if (value === null || value === undefined || value === '') {
      return '—';
    }
    return formatPurchaseOrderUnitCost(value);
  }

  formatAmount(value: number | string | null | undefined): string {
    if (value === null || value === undefined || value === '') {
      return '—';
    }
    return new Intl.NumberFormat('es-MX', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(parsePurchaseOrderDecimal(value));
  }

  formatPercent(value: number | string | null | undefined): string {
    return `${new Intl.NumberFormat('es-MX', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(parsePurchaseOrderDecimal(value))}%`;
  }

  onCustomsDateChange(): void {
    if (!this.canEdit()) {
      return;
    }
    if (this.customsExchangeRate == null) {
      this.prefillRate();
    }
  }

  private hydrate(order: PurchaseOrder): void {
    this.customsDate = this.toDateInput(order.customs_date);
    this.customsExchangeRate = this.optionalNumber(order.customs_exchange_rate);
    this.extras.set(this.mergeExtrasWithDefaults(order.extra_costs ?? []));
    const igi: Record<string, number | null> = {};
    for (const item of order.line_items ?? []) {
      igi[item.id] = this.optionalNumber(item.igi_percentage) ?? 0;
    }
    this.igiByLineId.set(igi);

    if (this.canEdit() && this.customsExchangeRate == null) {
      this.prefillRate();
    }
  }

  private prefillRate(): void {
    const date = this.customsDate || undefined;
    this.exchangeRateService.getDailyExchangeRate(date).subscribe({
      next: (rate) => {
        if (this.customsExchangeRate == null && Number.isFinite(rate.exchange_rate)) {
          this.customsExchangeRate = rate.exchange_rate;
          this.onCustomsRateChange();
        }
      },
      error: () => undefined,
    });
  }

  private extraForPreview(
    row: ExtraCostDraft,
    rate: number | null
  ): { amount: number; currency: PaymentCurrency } | null {
    if (row.lastEdited === 'USD') {
      const usd = this.optionalNumber(row.usd);
      return usd == null || usd <= 0 ? null : { amount: usd, currency: 'USD' };
    }
    const mxn = this.optionalNumber(row.mxn);
    if (mxn != null && mxn > 0) {
      return { amount: mxn, currency: 'MXN' };
    }
    const usd = this.optionalNumber(row.usd);
    if (usd != null && usd > 0 && rate != null) {
      return { amount: usd, currency: 'USD' };
    }
    return null;
  }

  private buildExtrasPayload(): UpdatePurchaseOrderRealCostPayload['extra_costs'] | null {
    const extras: UpdatePurchaseOrderRealCostPayload['extra_costs'] = [];

    for (const row of this.extras()) {
      const concept = row.concept.trim();
      const amount = row.lastEdited === 'USD' ? this.optionalNumber(row.usd) : this.optionalNumber(row.mxn);
      if (amount == null || amount === 0) {
        continue;
      }
      if (!concept) {
        this.toast.error('Cada gasto necesita un concepto');
        return null;
      }
      extras.push({
        concept: concept.slice(0, 120),
        amount,
        currency: row.lastEdited,
      });
    }

    return extras;
  }

  private buildPayload(
    extraCosts: UpdatePurchaseOrderRealCostPayload['extra_costs']
  ): UpdatePurchaseOrderRealCostPayload {
    return {
      customs_date: this.customsDate.trim() || null,
      customs_exchange_rate: this.optionalNumber(this.customsExchangeRate),
      extra_costs: extraCosts,
      line_items: this.lineItems().map((item) => ({
        line_item_id: item.id,
        igi_percentage: Number(this.lineIgi(item) ?? 0),
      })),
    };
  }

  private mergeExtrasWithDefaults(saved: PurchaseOrderExtraCost[]): ExtraCostDraft[] {
    const unused = [...saved];
    const rate = this.optionalNumber(this.customsExchangeRate);
    const rows: ExtraCostDraft[] = DEFAULT_EXTRA_CONCEPTS.map((concept) => {
      const index = unused.findIndex(
        (row) => this.normalizeConcept(row.concept) === this.normalizeConcept(concept)
      );
      const match = index >= 0 ? unused.splice(index, 1)[0] : null;
      return this.toDraft(match, concept, true, rate);
    });

    for (const extra of unused) {
      rows.push(this.toDraft(extra, extra.concept, false, rate));
    }
    return rows;
  }

  private toDraft(
    row: PurchaseOrderExtraCost | null,
    concept: string,
    preset: boolean,
    rate: number | null
  ): ExtraCostDraft {
    const amount = row ? this.optionalNumber(row.amount) : null;
    const currency = row?.currency === 'USD' ? 'USD' : 'MXN';
    if (currency === 'USD') {
      return {
        uid: row?.id || (preset ? `preset-${this.normalizeConcept(concept)}` : this.nextUid()),
        concept,
        usd: amount,
        mxn: convertExtraAmount(amount, 'USD', 'MXN', rate),
        lastEdited: 'USD',
        preset,
      };
    }
    return {
      uid: row?.id || (preset ? `preset-${this.normalizeConcept(concept)}` : this.nextUid()),
      concept,
      mxn: amount,
      usd: convertExtraAmount(amount, 'MXN', 'USD', rate),
      lastEdited: 'MXN',
      preset,
    };
  }

  private normalizeConcept(value: string): string {
    return value
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/\$/g, '')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
  }

  private toDateInput(value?: string | null): string {
    if (!value) {
      return '';
    }
    return value.slice(0, 10);
  }

  private optionalNumber(value: number | string | null | undefined): number | null {
    if (value === null || value === undefined || value === '') {
      return null;
    }
    const n = parsePurchaseOrderDecimal(value);
    return Number.isFinite(n) ? n : null;
  }

  private nextUid(): string {
    return `extra-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  }
}
