import { Component, Inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { formatPosMoney } from '../../models/pos-daily-shift.model';

export interface PartialShiftDialogData {
  dailyShiftId: string;
}

export interface PartialShiftDialogResult {
  denominations: Array<{ currency: 'MXN' | 'USD'; denomination: number; bill_count: number }>;
  notes?: string;
}

const MXN_DENOMS = [1000, 500, 200, 100, 50, 20];
const USD_DENOMS = [100, 50, 20, 10, 5, 1];

@Component({
  selector: 'app-partial-shift-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, ButtonComponent],
  templateUrl: './partial-shift-dialog.component.html',
  styleUrl: './partial-shift-dialog.component.scss',
})
export class PartialShiftDialogComponent {
  activeTab = signal<'MXN' | 'USD'>('MXN');
  notes = signal('');
  counts = signal<Record<string, number>>({});

  readonly mxnDenoms = MXN_DENOMS;
  readonly usdDenoms = USD_DENOMS;

  readonly totalMxn = computed(() => this.sumCurrency('MXN', MXN_DENOMS));
  readonly totalUsd = computed(() => this.sumCurrency('USD', USD_DENOMS));

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PartialShiftDialogData,
    private dialogRef: MatDialogRef<PartialShiftDialogComponent>
  ) {}

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

  private sumCurrency(currency: 'MXN' | 'USD', denoms: number[]): number {
    return denoms.reduce((sum, d) => sum + d * this.getCount(currency, d), 0);
  }

  formatMxn(value: number): string {
    return formatPosMoney(value);
  }

  cancel(): void {
    this.dialogRef.close();
  }

  confirm(): void {
    const denominations: PartialShiftDialogResult['denominations'] = [];
    for (const d of MXN_DENOMS) {
      const count = this.getCount('MXN', d);
      if (count > 0) {
        denominations.push({ currency: 'MXN', denomination: d, bill_count: count });
      }
    }
    for (const d of USD_DENOMS) {
      const count = this.getCount('USD', d);
      if (count > 0) {
        denominations.push({ currency: 'USD', denomination: d, bill_count: count });
      }
    }
    if (denominations.length === 0) {
      return;
    }
    this.dialogRef.close({
      denominations,
      notes: this.notes().trim() || undefined,
    } satisfies PartialShiftDialogResult);
  }
}
