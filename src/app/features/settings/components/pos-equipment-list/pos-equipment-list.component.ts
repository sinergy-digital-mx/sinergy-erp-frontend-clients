import { Component, OnInit, signal, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BranchService } from '../../services/branch.service';
import { Branch } from '../../models/branch.model';
import { POSService } from '../../../pos/services/pos.service';
import {
  PosDailyShiftListItem,
  dailyShiftBranchLabel,
  dailyShiftIsOpen,
  dailyShiftPartialCount,
  dailyShiftSalesTotal,
  dailyShiftStatusLabel,
  dailyShiftTerminalLabel,
  formatPosMoney,
} from '../../../pos/models/pos-daily-shift.model';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import {
  IDatatableConfig,
  IPaginationEvent,
} from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { CustomSnackbarComponent } from '../../../../core/components/custom-snackbar/custom-snackbar.component';
import { PosDailyShiftDetailModalComponent } from '../pos-daily-shift-detail-modal/pos-daily-shift-detail-modal.component';

@Component({
  selector: 'app-pos-equipment-list',
  standalone: true,
  imports: [CommonModule, FormsModule, DatatableWrapperComponent],
  templateUrl: './pos-equipment-list.component.html',
  styleUrl: './pos-equipment-list.component.scss',
})
export class PosEquipmentListComponent implements OnInit {
  @ViewChild('shiftsTableTemplate') shiftsTableTemplate: TemplateRef<unknown>;

  selectedBranchId = '';
  shiftDate = '';
  statusFilter = '';
  branches = signal<Branch[]>([]);

  table_config = signal<IDatatableConfig>({
    rows: [],
    columns: [
      { name: 'Fecha', prop: 'shift_date', sortable: false, canAutoResize: true, width: 110 },
      { name: 'Terminal cobranza', prop: 'terminal_user', sortable: false, canAutoResize: true, width: 180 },
      { name: 'Sucursal', prop: 'billing_branch', sortable: false, canAutoResize: true, width: 140 },
      { name: 'Estado', prop: 'status', sortable: false, canAutoResize: true, width: 90 },
      { name: 'Ventas totales', prop: 'sales_total', sortable: false, canAutoResize: true, width: 110 },
      { name: '# parciales', prop: 'partial_shifts_count', sortable: false, canAutoResize: true, width: 90 },
      { name: 'Efectivo inicial', prop: 'opening_cash_mxn', sortable: false, canAutoResize: true, width: 120 },
    ],
    externalPaging: true,
    externalSorting: false,
    page: 1,
    limit: 20,
    totalResults: 0,
    loading: false,
    emptyState: {
      title: 'Sin cortes',
      subtitle: 'No hay cortes globales para los filtros seleccionados',
    },
    columnMode: 'force',
    reorderable: false,
  });

  constructor(
    private posService: POSService,
    private branchService: BranchService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.branchService.getAllBranches().subscribe({
      next: (list) => this.branches.set(list),
      error: () => this.showError('Error al cargar sucursales'),
    });
    this.loadDailyShifts();
  }

  applyFilters(): void {
    this.table_config.update((c) => ({ ...c, page: 1 }));
    this.loadDailyShifts();
  }

  onPageChange(event: IPaginationEvent): void {
    this.table_config.update((c) => ({
      ...c,
      page: event.page,
      limit: event.limit,
    }));
    this.loadDailyShifts();
  }

  loadDailyShifts(): void {
    this.table_config.update((c) => ({ ...c, loading: true }));
    const cfg = this.table_config();

    this.posService
      .getDailyShifts({
        page: cfg.page,
        limit: cfg.limit,
        billing_branch_id: this.selectedBranchId || undefined,
        shift_date: this.shiftDate || undefined,
        status:
          this.statusFilter === 'open' || this.statusFilter === 'closed'
            ? this.statusFilter
            : undefined,
      })
      .subscribe({
        next: ({ data, total }) => {
          this.table_config.update((c) => ({
            ...c,
            rows: data,
            totalResults: total,
            loading: false,
          }));
        },
        error: (error) => {
          this.table_config.update((c) => ({ ...c, loading: false }));
          this.showError(error.error?.message || 'Error al cargar cortes');
        },
      });
  }

  viewDetail(shift: PosDailyShiftListItem): void {
    this.dialog.open(PosDailyShiftDetailModalComponent, {
      width: '560px',
      maxWidth: 'calc(100vw - 24px)',
      autoFocus: false,
      panelClass: 'pos-daily-shift-detail-panel',
      data: { shiftId: shift.id },
    });
  }

  terminalLabel(row: PosDailyShiftListItem): string {
    return dailyShiftTerminalLabel(row);
  }

  branchLabel(row: PosDailyShiftListItem): string {
    return dailyShiftBranchLabel(row);
  }

  statusLabel(row: PosDailyShiftListItem): string {
    return dailyShiftStatusLabel(row.status);
  }

  isOpen(row: PosDailyShiftListItem): boolean {
    return dailyShiftIsOpen(row);
  }

  salesTotal(row: PosDailyShiftListItem): string {
    return formatPosMoney(dailyShiftSalesTotal(row));
  }

  partialCount(row: PosDailyShiftListItem): number {
    return dailyShiftPartialCount(row);
  }

  openingCash(row: PosDailyShiftListItem): string {
    return formatPosMoney(row.opening_cash_mxn);
  }

  private showError(message: string): void {
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      data: { message, type: 'error' },
      duration: 5000,
    });
  }
}
