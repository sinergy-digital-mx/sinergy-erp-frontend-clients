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
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IDatatableConfig } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { PosEquipmentDetailModalComponent } from '../pos-equipment-detail-modal/pos-equipment-detail-modal.component';
import { CustomSnackbarComponent } from '../../../../core/components/custom-snackbar/custom-snackbar.component';

/** Fila de lista de turnos / sesiones POS (forma flexible según API). */
export type PosCashShiftRow = Record<string, unknown>;

@Component({
  selector: 'app-pos-equipment-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    DatatableWrapperComponent,
    ButtonComponent,
  ],
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
  branches = signal<Branch[]>([]);
  private branchesLoaded = false;

  table_config = signal<IDatatableConfig>({
    rows: [],
    columns: [
      { name: 'Código', prop: 'code', sortable: true, canAutoResize: true, width: 160 },
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
      { name: 'Turno', prop: 'id', sortable: false, canAutoResize: true, width: 120 },
      { name: 'Sucursal', prop: 'branch', sortable: false, canAutoResize: true, width: 180 },
      { name: 'Apertura', prop: 'opened_at', sortable: false, canAutoResize: true, width: 150 },
      { name: 'Cierre', prop: 'closed_at', sortable: false, canAutoResize: true, width: 150 },
      { name: 'Estado', prop: 'status', sortable: false, canAutoResize: true, width: 100 },
    ],
    externalPaging: false,
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

  /** Recarga la pestaña activa con buscar + sucursal actuales. */
  applyFilters(): void {
    if (this.activeTabIndex() === 0) {
      this.loadPosConfigurations();
    } else {
      this.loadSessions();
    }
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

    this.posService.getCashShifts(params).subscribe({
      next: (res) => {
        const { rows, total } = this.normalizeShiftListResponse(res);
        this.sessions_table_config.update((c) => ({
          ...c,
          rows,
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
    rows: PosCashShiftRow[];
    total: number;
  } {
    if (res == null) {
      return { rows: [], total: 0 };
    }
    if (Array.isArray(res)) {
      return { rows: res as PosCashShiftRow[], total: res.length };
    }
    const obj = res as Record<string, unknown>;
    const raw =
      obj['data'] ?? obj['shifts'] ?? obj['results'] ?? obj['items'];
    const rows = Array.isArray(raw)
      ? (raw as PosCashShiftRow[])
      : [];
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

  sessionBranchLabel(row: PosCashShiftRow): string {
    const b = row['branch'] ?? row['sucursal_detail'];
    if (b && typeof b === 'object') {
      const o = b as Record<string, unknown>;
      const name = (o['display_name'] ?? o['name']) as string | undefined;
      if (name) {
        return name;
      }
      if (typeof o['code'] === 'string') {
        return o['code'];
      }
    }
    if (typeof row['warehouse_name'] === 'string') {
      return row['warehouse_name'];
    }
    if (typeof row['sucursal_name'] === 'string') {
      return row['sucursal_name'];
    }
    return '—';
  }

  shiftIdShort(row: PosCashShiftRow): string {
    const id = row['id'];
    if (typeof id === 'string' && id.length > 10) {
      return id.slice(0, 8) + '…';
    }
    return typeof id === 'string' ? id : '—';
  }

  shiftIsOpen(row: PosCashShiftRow): boolean {
    const closed = row['closed_at'];
    return closed == null || closed === '';
  }

  shiftStatusClass(row: PosCashShiftRow): string {
    return this.shiftIsOpen(row)
      ? 'bg-green-100 text-green-800'
      : 'bg-gray-100 text-gray-700';
  }

  shiftStatusLabel(row: PosCashShiftRow): string {
    return this.shiftIsOpen(row) ? 'Abierta' : 'Cerrada';
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
    return status === 1 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800';
  }

  getStatusLabel(status: number): string {
    return status === 1 ? 'Activo' : 'Inactivo';
  }
}
