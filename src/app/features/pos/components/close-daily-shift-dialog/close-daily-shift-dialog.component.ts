import { Component, Inject, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import {
  cashDifferenceType,
  expectedCashInDrawer,
  formatPosMoney,
} from '../../models/pos-daily-shift.model';

export interface CloseDailyShiftDialogData {
  shiftDate: string;
  branchLabel: string;
  openingCashMxn: number;
  openingCashUsd: number;
  collectedCashMxn: number;
  collectedCashUsd: number;
  collectedTransferMxn: number;
  collectedCardMxn: number;
  collectedCreditMxn: number;
  removedMxn: number;
  removedUsd: number;
  expectedCashMxn?: number;
  expectedCashUsd?: number;
  partialCount: number;
  pendingCount: number;
  isHistorical?: boolean;
}

export interface CloseDailyShiftDialogResult {
  notes?: string;
  closing_cash_mxn: number;
  closing_cash_usd: number;
  denominations: Array<{ currency: 'MXN' | 'USD'; denomination: number; bill_count: number }>;
}

const MXN_DENOMS = [1000, 500, 200, 100, 50, 20, 10, 5, 2, 1];
const USD_DENOMS = [100, 50, 20, 10, 5, 1];

@Component({
  selector: 'app-close-daily-shift-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './close-daily-shift-dialog.component.html',
  styleUrl: './close-daily-shift-dialog.component.scss',
})
export class CloseDailyShiftDialogComponent {
  notes = signal('');
  activeTab = signal<'MXN' | 'USD'>('MXN');
  counts = signal<Record<string, number>>({});
  centsMxnRaw = signal('');
  centsUsdRaw = signal('');

  readonly mxnDenoms = MXN_DENOMS;
  readonly usdDenoms = USD_DENOMS;

  readonly centsMxn = computed(() => this.parseCents(this.centsMxnRaw()));
  readonly centsUsd = computed(() => this.parseCents(this.centsUsdRaw()));

  readonly countedMxn = computed(() =>
    this.roundMoney(this.sumCurrency('MXN', MXN_DENOMS) + this.centsMxn()),
  );
  readonly countedUsd = computed(() =>
    this.roundMoney(this.sumCurrency('USD', USD_DENOMS) + this.centsUsd()),
  );

  readonly expectedMxn = computed(() =>
    this.data.expectedCashMxn ??
    expectedCashInDrawer(
      this.data.openingCashMxn,
      this.data.collectedCashMxn,
      this.data.removedMxn,
    ),
  );

  readonly expectedUsd = computed(() =>
    this.data.expectedCashUsd ??
    expectedCashInDrawer(
      this.data.openingCashUsd,
      this.data.collectedCashUsd,
      this.data.removedUsd,
    ),
  );

  readonly differenceMxn = computed(() => this.countedMxn() - this.expectedMxn());
  readonly differenceUsd = computed(() => this.countedUsd() - this.expectedUsd());
  readonly differenceMxnType = computed(() =>
    cashDifferenceType(this.countedMxn(), this.expectedMxn()),
  );
  readonly differenceUsdType = computed(() =>
    cashDifferenceType(this.countedUsd(), this.expectedUsd()),
  );

  readonly activeCounted = computed(() =>
    this.activeTab() === 'USD' ? this.countedUsd() : this.countedMxn(),
  );
  readonly activeDifference = computed(() =>
    this.activeTab() === 'USD' ? this.differenceUsd() : this.differenceMxn(),
  );
  readonly activeDifferenceType = computed(() =>
    this.activeTab() === 'USD' ? this.differenceUsdType() : this.differenceMxnType(),
  );

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CloseDailyShiftDialogData,
    private dialogRef: MatDialogRef<CloseDailyShiftDialogComponent, CloseDailyShiftDialogResult>
  ) {}

  formatMxn(value: number): string {
    return formatPosMoney(value);
  }

  formatMoney(currency: 'MXN' | 'USD', value: number): string {
    if (currency === 'USD') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(value);
    }
    return formatPosMoney(value);
  }

  formatDenomLabel(currency: 'MXN' | 'USD', denomination: number): string {
    return currency === 'USD' ? `USD ${denomination}` : `$${denomination}`;
  }

  denomAriaLabel(currency: 'MXN' | 'USD', denomination: number): string {
    return currency === 'USD'
      ? `Billetes de ${denomination} dólares`
      : `Piezas de ${denomination} pesos`;
  }

  setCentsRaw(currency: 'MXN' | 'USD', value: string | number | null): void {
    const raw = value == null ? '' : String(value);
    if (currency === 'USD') {
      this.centsUsdRaw.set(raw);
      return;
    }
    this.centsMxnRaw.set(raw);
  }

  abs(value: number): number {
    return Math.abs(value);
  }

  key(currency: 'MXN' | 'USD', denomination: number): string {
    return `${currency}-${denomination}`;
  }

  getCount(currency: 'MXN' | 'USD', denomination: number): number {
    return this.counts()[this.key(currency, denomination)] ?? 0;
  }

  setCount(currency: 'MXN' | 'USD', denomination: number, value: number): void {
    const k = this.key(currency, denomination);
    this.counts.update((map) => ({ ...map, [k]: Math.max(0, Math.floor(value || 0)) }));
  }

  adjustCount(currency: 'MXN' | 'USD', denomination: number, delta: number): void {
    this.setCount(currency, denomination, this.getCount(currency, denomination) + delta);
  }

  onDenomKeydown(event: KeyboardEvent, currency: 'MXN' | 'USD', denomination: number): void {
    if (event.key === 'ArrowUp' || event.key === 'ArrowRight' || event.key === '+' || event.key === '=') {
      event.preventDefault();
      this.adjustCount(currency, denomination, 1);
      return;
    }
    if (event.key === 'ArrowDown' || event.key === 'ArrowLeft' || event.key === '-' || event.key === '_') {
      event.preventDefault();
      this.adjustCount(currency, denomination, -1);
    }
  }

  differenceLabel(type: 'exact' | 'surplus' | 'shortage'): string {
    if (type === 'exact') {
      return 'Cuadra';
    }
    return type === 'surplus' ? 'Sobrante' : 'Faltante';
  }

  private parseCents(raw: string): number {
    const normalized = raw.trim().replace(',', '.');
    if (!normalized) {
      return 0;
    }
    const n = Number(normalized);
    if (!Number.isFinite(n) || n <= 0) {
      return 0;
    }
    return this.roundMoney(n);
  }

  private roundMoney(value: number): number {
    return Math.round((value + Number.EPSILON) * 100) / 100;
  }

  private sumCurrency(currency: 'MXN' | 'USD', denoms: number[]): number {
    return denoms.reduce((total, d) => total + d * this.getCount(currency, d), 0);
  }

  private buildDenominations(): CloseDailyShiftDialogResult['denominations'] {
    const denominations: CloseDailyShiftDialogResult['denominations'] = [];
    for (const d of MXN_DENOMS) {
      const count = this.getCount('MXN', d);
      if (count > 0) {
        denominations.push({ currency: 'MXN', denomination: d, bill_count: count });
      }
    }
    if (this.centsMxn() > 0) {
      denominations.push({ currency: 'MXN', denomination: this.centsMxn(), bill_count: 1 });
    }
    for (const d of USD_DENOMS) {
      const count = this.getCount('USD', d);
      if (count > 0) {
        denominations.push({ currency: 'USD', denomination: d, bill_count: count });
      }
    }
    if (this.centsUsd() > 0) {
      denominations.push({ currency: 'USD', denomination: this.centsUsd(), bill_count: 1 });
    }
    return denominations;
  }

  cancel(): void {
    this.dialogRef.close();
  }

  confirm(): void {
    this.dialogRef.close({
      notes: this.notes().trim() || undefined,
      closing_cash_mxn: this.countedMxn(),
      closing_cash_usd: this.countedUsd(),
      denominations: this.buildDenominations(),
    });
  }
}
