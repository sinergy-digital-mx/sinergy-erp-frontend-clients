import { Component, signal, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PosEquipmentService } from '../../services/pos-equipment.service';
import { BranchService } from '../../services/branch.service';
import { PosConfiguration } from '../../models/pos-equipment.model';
import { Branch } from '../../models/branch.model';
import { POSService } from '../../../pos/services/pos.service';
import {
  PosSessionListItem,
  formatPosCurrency,
  formatPosDateTime,
  parsePosMoney,
  posSessionEquipmentLabel,
  posSessionUserLabel,
  resolveSessionBranchLabel,
  sessionIsOpen,
  sessionOpeningCash,
  sessionTotalSales,
  sessionTurnLabel,
} from '../../../pos/models/pos-session.model';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import {
  IDatatableConfig,
  IPaginationEvent,
} from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { PosEquipmentDetailModalComponent } from '../pos-equipment-detail-modal/pos-equipment-detail-modal.component';
import { PosSessionDetailModalComponent } from '../pos-session-detail-modal/pos-session-detail-modal.component';
import { PosSessionCloseDialogComponent } from '../pos-session-close-dialog/pos-session-close-dialog.component';
import { CustomSnackbarComponent } from '../../../../core/components/custom-snackbar/custom-snackbar.component';

@Component({
  selector: 'app-pos-equipment-list',
  standalone: true,
  imports: [CommonModule, FormsModule, DatatableWrapperComponent, ButtonComponent],
  templateUrl: './pos-equipment-list.component.html',
  styleUrl: './pos-equipment-list.component.scss',
})
export class PosEquipmentListComponent {
  @ViewChild('equiposTableTemplate') equiposTableTemplate: TemplateRef<unknown>;
  @ViewChild('sessionsTableTemplate') sessionsTableTemplate: TemplateRef<unknown>;

  activeTabIndex = signal(0);

  search = '';
  sessionsSearch = '';
  selectedSucursalId = '';
  selectedType = '';
  sessionsStatusFilter = '';
  sessionsDateFrom = '';
  sessionsDateTo = '';
  branches = signal<Branch[]>([]);
  private branchesLoaded = false;

  table_config = signal<IDatatableConfig>({
    rows: [],
    columns: [
      { name: 'Código', prop: 'code', sortable: true, canAutoResize: true, width: 160 },
      { name: 'Tipo', prop: 'type', sortable: true, canAutoResize: true, width: 120 },
      { name: 'Modelo', prop: 'modelo', sortable: true, canAutoResize: true, width: 200 },
      { name: 'Sucursal', prop: 'sucursal', sortable: true, canAutoResize: true, width: 180 },
      { name: 'Estado', prop: 'status', sortable: true, canAutoResize: true, width: 100 },
    ],
    externalPaging: false,
    externalSorting: false,
    page: 1,
    limit: 20,
    totalResults: 0,
    loading: false,
    emptyState: { title: 'Sin resultados', subtitle: 'No se encontraron equipos' },
    columnMode: 'force',
    reorderable: false,
  });

  sessions_table_config = signal<IDatatableConfig>({
    rows: [],
    columns: [
      { name: 'Turno', prop: 'session_number', sortable: false, canAutoResize: true, width: 72 },
      { name: 'Equipo', prop: 'equipment', sortable: false, canAutoResize: true, width: 180 },
      { name: 'Sucursal', prop: 'branch', sortable: false, canAutoResize: true, width: 140 },
      { name: 'Abierta por', prop: 'user', sortable: false, canAutoResize: true, width: 130 },
      { name: 'Apertura', prop: 'opened_at', sortable: false, canAutoResize: true, width: 130 },
      { name: 'Cierre', prop: 'closed_at', sortable: false, canAutoResize: true, width: 130 },
      { name: 'Apertura $', prop: 'opening_cash', sortable: false, canAutoResize: true, width: 100 },
      { name: 'Ventas', prop: 'total_sales', sortable: false, canAutoResize: true, width: 100 },
      { name: 'Estado', prop: 'status', sortable: false, canAutoResize: true, width: 88 },
      { name: '', prop: 'actions', sortable: false, canAutoResize: false, width: 128 },
    ],
    externalPaging: true,
    externalSorting: false,
    page: 1,
    limit: 20,
    totalResults: 0,
    loading: false,
    emptyState: { title: 'Sin resultados', subtitle: 'No hay sesiones para los filtros seleccionados' },
    columnMode: 'force',
    reorderable: false,
  });

  constructor(
    private posEquipmentService: PosEquipmentService,
    private posService: POSService,
    private branchService: BranchService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this.ensureBranches();
    this.loadPosConfigurations();
  }

  onTabChange(index: number): void {
    this.activeTabIndex.set(index);
    if (index === 1) {
      this.loadSessions();
    } else {
      this.loadPosConfigurations();
    }
  }

  applyFilters(): void {
    if (this.activeTabIndex() === 0) {
      this.loadPosConfigurations();
    } else {
      this.sessions_table_config.update((c) => ({ ...c, page: 1 }));
      this.loadSessions();
    }
  }

  onSessionsPageChange(event: IPaginationEvent): void {
    this.sessions_table_config.update((c) => ({
      ...c,
      page: event.page,
      limit: event.limit,
    }));
    this.loadSessions();
  }

  private ensureBranches(): void {
    if (this.branchesLoaded) {
      return;
    }
    this.branchesLoaded = true;
    this.branchService.getAllBranches().subscribe({
      next: (list) => this.branches.set(list),
      error: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: 'Error al cargar sucursales', type: 'error' },
          duration: 4000,
        });
      },
    });
  }

  loadPosConfigurations(): void {
    this.table_config.update((c) => ({ ...c, loading: true }));

    const cfg = this.table_config();
    const params: Record<string, string | number> = {
      page: cfg.page,
      limit: cfg.limit,
    };
    if (this.search?.trim()) {
      params['search'] = this.search.trim();
    }
    if (this.selectedSucursalId?.trim()) {
      params['sucursal'] = this.selectedSucursalId.trim();
    }
    if (this.selectedType?.trim()) {
      params['type'] = this.selectedType.trim();
    }

    this.posEquipmentService.getPosConfigurations(params).subscribe({
      next: (res) => {
        this.table_config.update((c) => ({
          ...c,
          rows: res.data,
          totalResults: res.total,
          loading: false,
        }));
      },
      error: (error) => {
        console.error('Error loading pos configurations:', error);
        this.table_config.update((c) => ({ ...c, loading: false }));
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: {
            message: error.error?.message || 'Error al cargar configuraciones POS',
            type: 'error',
          },
          duration: 5000,
        });
      },
    });
  }

  loadSessions(): void {
    this.sessions_table_config.update((c) => ({ ...c, loading: true }));
    const cfg = this.sessions_table_config();
    const params: {
      page: number;
      limit: number;
      search?: string;
      sucursal?: string;
      status?: 'open' | 'closed';
      opened_from?: string;
      opened_to?: string;
    } = {
      page: cfg.page,
      limit: cfg.limit,
    };
    if (this.sessionsSearch?.trim()) {
      params.search = this.sessionsSearch.trim();
    }
    if (this.selectedSucursalId?.trim()) {
      params.sucursal = this.selectedSucursalId.trim();
    }
    if (this.sessionsStatusFilter === 'open' || this.sessionsStatusFilter === 'closed') {
      params.status = this.sessionsStatusFilter;
    }
    if (this.sessionsDateFrom) {
      params.opened_from = this.sessionsDateFrom;
    }
    if (this.sessionsDateTo) {
      params.opened_to = this.sessionsDateTo;
    }

    this.posService.getCashShifts(params).subscribe({
      next: (res) => {
        const { rows, total } = this.normalizeShiftListResponse(res);
        this.sessions_table_config.update((c) => ({
          ...c,
          rows: rows as PosSessionListItem[],
          totalResults: total,
          loading: false,
        }));
      },
      error: (error) => {
        console.error('Error loading cash shifts:', error);
        this.sessions_table_config.update((c) => ({ ...c, loading: false }));
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: {
            message: error.error?.message || 'Error al cargar sesiones',
            type: 'error',
          },
          duration: 5000,
        });
      },
    });
  }

  private normalizeShiftListResponse(res: unknown): {
    rows: PosSessionListItem[];
    total: number;
  } {
    if (res == null) {
      return { rows: [], total: 0 };
    }
    if (Array.isArray(res)) {
      return { rows: res as PosSessionListItem[], total: res.length };
    }
    const obj = res as Record<string, unknown>;
    const raw = obj['data'] ?? obj['shifts'] ?? obj['results'] ?? obj['items'];
    const rows = Array.isArray(raw) ? (raw as PosSessionListItem[]) : [];
    const total =
      (typeof obj['total'] === 'number' ? obj['total'] : null) ??
      (typeof obj['count'] === 'number' ? obj['count'] : null) ??
      rows.length;
    return { rows, total };
  }

  branchLabel(item: PosConfiguration): string {
    const b = item.branch;
    if (b && typeof b === 'object') {
      const name = (b['display_name'] ?? b['name']) as string | undefined;
      if (name) {
        return name;
      }
      const code = b['code'] as string | undefined;
      if (code) {
        return code;
      }
    }
    return '—';
  }

  sessionBranchLabel(row: PosSessionListItem): string {
    return resolveSessionBranchLabel(row, this.branches());
  }

  sessionEquipmentLabel(row: PosSessionListItem): string {
    return posSessionEquipmentLabel(row);
  }

  sessionUserLabel(row: PosSessionListItem): string {
    return posSessionUserLabel(row);
  }

  sessionTurnLabel(row: PosSessionListItem): string {
    return sessionTurnLabel(row);
  }

  sessionIsOpen(row: PosSessionListItem): boolean {
    return sessionIsOpen(row);
  }

  sessionStatusClass(row: PosSessionListItem): string {
    return this.sessionIsOpen(row)
      ? 'settings-badge--status-active'
      : 'settings-badge--status-inactive';
  }

  sessionStatusLabel(row: PosSessionListItem): string {
    return this.sessionIsOpen(row) ? 'Abierta' : 'Cerrada';
  }

  formatSessionDate(value?: string): string {
    return formatPosDateTime(value);
  }

  formatSessionMoney(value: unknown): string {
    return formatPosCurrency(parsePosMoney(value));
  }

  viewSessionDetail(session: PosSessionListItem, event?: Event): void {
    event?.stopPropagation();
    this.dialog.open(PosSessionDetailModalComponent, {
      width: '520px',
      maxWidth: 'calc(100vw - 24px)',
      autoFocus: false,
      panelClass: 'pos-session-detail-panel',
      data: { session, branches: this.branches() },
    });
  }

  closeSession(session: PosSessionListItem, event?: Event): void {
    event?.stopPropagation();
    if (!this.sessionIsOpen(session)) {
      return;
    }

    const dialogRef = this.dialog.open(PosSessionCloseDialogComponent, {
      width: '520px',
      maxWidth: 'calc(100vw - 24px)',
      disableClose: true,
      autoFocus: false,
      panelClass: 'pos-session-close-panel',
      data: { session, branches: this.branches() },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }

      this.posService
        .closePosSession(session.id, {
          closing_balance: result.closing_balance,
          notes: result.notes,
        })
        .subscribe({
          next: (closed) => {
            const counted = parsePosMoney(result.closing_balance);
            const expected =
              parsePosMoney(closed?.expected_cash) ||
              sessionOpeningCash(session) + sessionTotalSales(session);
            const diff =
              parsePosMoney(closed?.cash_difference ?? closed?.difference) ||
              counted - expected;
            const diffText =
              diff === 0
                ? 'Diferencia: $0.00'
                : diff > 0
                  ? `Diferencia: +${formatPosCurrency(diff)}`
                  : `Diferencia: ${formatPosCurrency(diff)}`;
            const diffType = diff === 0 ? 'success' : diff > 0 ? 'warning' : 'error';

            this.snackBar.openFromComponent(CustomSnackbarComponent, {
              data: {
                message: `Sesión cerrada. Contado: ${formatPosCurrency(counted)} · Esperado: ${formatPosCurrency(expected)} · ${diffText}`,
                type: diffType,
              },
              duration: 6000,
            });
            this.loadSessions();
          },
          error: (error) => {
            this.snackBar.openFromComponent(CustomSnackbarComponent, {
              data: {
                message: error.error?.message || 'Error al cerrar la sesión',
                type: 'error',
              },
              duration: 5000,
            });
          },
        });
    });
  }

  openCreateEquipmentModal(): void {
    const dialogRef = this.dialog.open(PosEquipmentDetailModalComponent, {
      width: '440px',
      maxWidth: 'calc(100vw - 24px)',
      autoFocus: false,
      data: { configuration: null },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadPosConfigurations();
      }
    });
  }

  viewDetail(configuration: PosConfiguration): void {
    const dialogRef = this.dialog.open(PosEquipmentDetailModalComponent, {
      width: '440px',
      maxWidth: 'calc(100vw - 24px)',
      autoFocus: false,
      data: { configuration },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadPosConfigurations();
      }
    });
  }

  getStatusClass(status: number): string {
    return status === 1 ? 'settings-badge--status-active' : 'settings-badge--status-inactive';
  }

  getStatusLabel(status: number): string {
    return status === 1 ? 'Activo' : 'Inactivo';
  }
}
