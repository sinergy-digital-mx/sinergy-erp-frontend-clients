import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CloseButtonComponent } from '../../../../core/components/close-button/close-button.component';
import { ContractSaleBadgeComponent } from '../../../contracts/components/contract-sale-badge/contract-sale-badge.component';
import { SaleMixRow } from '../../models/divino-dashboard.model';

export interface SaleMixDialogData {
  periodLabel: string;
  rows: SaleMixRow[];
}

type SaleFilter = 'all' | 'cash' | 'financed';

@Component({
  selector: 'app-divino-sale-mix-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule, CloseButtonComponent, ContractSaleBadgeComponent],
  templateUrl: './sale-mix-dialog.component.html',
  styleUrl: './sale-mix-dialog.component.scss',
})
export class DivinoSaleMixDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<DivinoSaleMixDialogComponent>);
  private readonly router = inject(Router);
  readonly data = inject<SaleMixDialogData>(MAT_DIALOG_DATA);

  readonly filter = signal<SaleFilter>('all');
  readonly search = signal('');

  readonly cashRows = computed(() => this.data.rows.filter((row) => row.sale_type === 'cash'));
  readonly financedRows = computed(() => this.data.rows.filter((row) => row.sale_type === 'financed'));
  readonly mixRows = computed(() =>
    this.financedRows().filter((row) => row.down_payment_financed),
  );
  readonly financingOnlyRows = computed(() =>
    this.financedRows().filter((row) => !row.down_payment_financed),
  );

  readonly visibleRows = computed(() => {
    const query = this.search().trim().toLowerCase();
    const kind = this.filter();
    return this.data.rows.filter((row) => {
      if (kind !== 'all' && row.sale_type !== kind) return false;
      if (!query) return true;
      return [row.contract_number, row.customer_name, row.property_code]
        .join(' ')
        .toLowerCase()
        .includes(query);
    });
  });

  readonly cashTotals = computed(() => this.sumByCurrency(this.cashRows()));
  readonly financedTotals = computed(() => this.sumByCurrency(this.financedRows()));

  setFilter(filter: SaleFilter): void {
    this.filter.set(filter);
  }

  close(): void {
    this.dialogRef.close();
  }

  openContract(row: SaleMixRow): void {
    this.dialogRef.close();
    void this.router.navigate(['/contracts/detail', row.contract_id]);
  }

  formatDate(value: string): string {
    const day = String(value ?? '').slice(0, 10);
    const [year, month, date] = day.split('-');
    if (!year || !month || !date) return day || '—';
    return `${date}/${month}/${year}`;
  }

  formatMoney(amount: number, currency: string): string {
    const code = currency === 'MXN' ? 'MXN' : 'USD';
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: code,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount ?? 0);
  }

  private sumByCurrency(rows: SaleMixRow[]): { currency: string; amount: number }[] {
    const totals = new Map<string, number>();
    for (const row of rows) {
      const currency = row.currency || 'USD';
      totals.set(currency, (totals.get(currency) ?? 0) + Number(row.total_price || 0));
    }
    return [...totals.entries()].map(([currency, amount]) => ({ currency, amount }));
  }
}
