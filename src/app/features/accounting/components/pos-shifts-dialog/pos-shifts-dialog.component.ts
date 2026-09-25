import { Component, Inject, OnInit, TemplateRef, ViewChild, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IDatatableConfig } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { AccountingService } from '../../services/accounting.service';
import { AccountingDailyShiftRow, AccountingPeriod } from '../../models/accounting.model';
import {
  PosDailyShiftDetailModalComponent,
} from '../../../settings/components/pos-daily-shift-detail-modal/pos-daily-shift-detail-modal.component';
import { dailyShiftStatusLabel } from '../../../pos/models/pos-daily-shift.model';
import { formatPosUser } from '../../../sales-orders/utils/pos-user-display.util';
import { TaxCalculatorService } from '../../../purchase-orders/services/tax-calculator.service';

export type PosShiftsDialogView = 'globals' | 'partials';

export interface PosShiftsDialogData {
  billingBranchId: string;
  period: AccountingPeriod;
  dateFrom: string;
  dateTo: string;
  view?: PosShiftsDialogView;
  initialShiftId?: string;
}

interface PartialRow {
  id: string;
  daily_shift_id: string;
  shift_date: string;
  partial_number: number;
  created_at?: string;
  removed_total_mxn: number;
  performed_by: string;
  notes?: string | null;
}

@Component({
  selector: 'app-pos-shifts-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, DatatableWrapperComponent],
  templateUrl: './pos-shifts-dialog.component.html',
  styleUrl: './pos-shifts-dialog.component.scss',
})
export class PosShiftsDialogComponent implements OnInit {
  @ViewChild('globalsTemplate') globalsTemplate: TemplateRef<unknown>;
  @ViewChild('partialsTemplate') partialsTemplate: TemplateRef<unknown>;

  view = signal<PosShiftsDialogView>('globals');
  loading = signal(false);
  shifts = signal<AccountingDailyShiftRow[]>([]);

  readonly partialRows = computed<PartialRow[]>(() =>
    this.shifts().flatMap((shift) =>
      (shift.partial_shifts ?? []).map((partial) => ({
        id: partial.id,
        daily_shift_id: shift.id,
        shift_date: shift.shift_date,
        partial_number: partial.partial_number ?? 0,
        created_at: partial.created_at,
        removed_total_mxn: Number(partial.removed_total_mxn || 0),
        performed_by: formatPosUser(partial.performed_by_user),
        notes: partial.notes,
      }))
    )
  );

  globalsConfig = signal<IDatatableConfig>({
    rows: [],
    columns: [
      { name: 'Fecha', prop: 'shift_date', sortable: false, canAutoResize: false, width: 120 },
      { name: 'Estado', prop: 'status', sortable: false, canAutoResize: false, width: 110 },
      { name: 'Terminal', prop: 'terminal_name', sortable: false, canAutoResize: false, width: 160 },
      { name: 'Parciales', prop: 'partial_shifts_count', sortable: false, canAutoResize: false, width: 90 },
      { name: 'Retiros MXN', prop: 'removed_total_mxn', sortable: false, canAutoResize: false, width: 120 },
      { name: 'Acción', prop: 'action', sortable: false, canAutoResize: false, width: 110 },
    ],
    externalPaging: false,
    externalSorting: false,
    page: 1,
    limit: 50,
    totalResults: 0,
    loading: false,
    emptyState: { title: 'Sin cortes', subtitle: 'No hay cortes globales en el periodo de esta sucursal' },
    columnMode: 'force',
    reorderable: false,
  });

  partialsConfig = signal<IDatatableConfig>({
    rows: [],
    columns: [
      { name: 'Fecha corte', prop: 'shift_date', sortable: false, canAutoResize: false, width: 120 },
      { name: 'Parcial', prop: 'partial_number', sortable: false, canAutoResize: false, width: 90 },
      { name: 'Hora', prop: 'created_at', sortable: false, canAutoResize: false, width: 140 },
      { name: 'Realizó', prop: 'performed_by', sortable: false, canAutoResize: false, width: 160 },
      { name: 'Retiro MXN', prop: 'removed_total_mxn', sortable: false, canAutoResize: false, width: 120 },
      { name: 'Acción', prop: 'action', sortable: false, canAutoResize: false, width: 110 },
    ],
    externalPaging: false,
    externalSorting: false,
    page: 1,
    limit: 50,
    totalResults: 0,
    loading: false,
    emptyState: { title: 'Sin parciales', subtitle: 'No hay cortes parciales en el periodo de esta sucursal' },
    columnMode: 'force',
    reorderable: false,
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PosShiftsDialogData,
    private dialogRef: MatDialogRef<PosShiftsDialogComponent>,
    private dialog: MatDialog,
    private accountingService: AccountingService,
    private taxCalculator: TaxCalculatorService
  ) {
    this.view.set(data.view ?? 'globals');
  }

  ngOnInit(): void {
    this.loadShifts();
  }

  close(): void {
    this.dialogRef.close();
  }

  setView(view: PosShiftsDialogView): void {
    this.view.set(view);
  }

  formatCurrency(value: number | string | undefined | null): string {
    const n = value == null ? 0 : Number(value);
    return this.taxCalculator.formatCurrency(Number.isFinite(n) ? n : 0);
  }

  formatDate(value?: string): string {
    if (!value) return '—';
    const d = new Date(value.includes('T') ? value : `${value}T00:00:00`);
    if (Number.isNaN(d.getTime())) return value;
    return d.toLocaleDateString('es-MX', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  formatDateTime(value?: string): string {
    if (!value) return '—';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    return d.toLocaleString('es-MX', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  statusLabel(status: string): string {
    return dailyShiftStatusLabel(status);
  }

  isOpen(status: string): boolean {
    return status === 'open';
  }

  openShift(shiftId: string): void {
    this.dialog.open(PosDailyShiftDetailModalComponent, {
      width: '560px',
      maxWidth: 'calc(100vw - 24px)',
      autoFocus: false,
      panelClass: 'pos-daily-shift-detail-panel',
      data: { shiftId, readOnly: true, source: 'accounting' },
    });
  }

  private loadShifts(): void {
    this.loading.set(true);
    this.globalsConfig.update((cfg) => ({ ...cfg, loading: true }));
    this.partialsConfig.update((cfg) => ({ ...cfg, loading: true }));

    this.accountingService
      .getPosDailyShifts({
        period: this.data.period,
        billing_branch_id: this.data.billingBranchId,
        date_from: this.data.period === 'range' ? this.data.dateFrom : undefined,
        date_to: this.data.period === 'range' ? this.data.dateTo : undefined,
      })
      .subscribe({
        next: (rows) => {
          this.shifts.set(rows);
          this.globalsConfig.update((cfg) => ({
            ...cfg,
            rows,
            totalResults: rows.length,
            loading: false,
          }));
          const partials = this.partialRows();
          this.partialsConfig.update((cfg) => ({
            ...cfg,
            rows: partials,
            totalResults: partials.length,
            loading: false,
          }));
          this.loading.set(false);
          if (this.data.initialShiftId) {
            this.openShift(this.data.initialShiftId);
          }
        },
        error: () => {
          this.shifts.set([]);
          this.globalsConfig.update((cfg) => ({ ...cfg, rows: [], totalResults: 0, loading: false }));
          this.partialsConfig.update((cfg) => ({ ...cfg, rows: [], totalResults: 0, loading: false }));
          this.loading.set(false);
        },
      });
  }
}
