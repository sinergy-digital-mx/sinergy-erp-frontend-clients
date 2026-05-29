import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastService } from '../../../../core/services/toast.service';
import { WarehouseService } from '../../../settings/services/warehouse.service';
import { BranchService } from '../../../settings/services/branch.service';
import { PosEquipmentService } from '../../../settings/services/pos-equipment.service';
import { Warehouse, WarehouseListResponse } from '../../../settings/models/warehouse.model';
import { Branch } from '../../../settings/models/branch.model';
import {
  PosConfiguration,
  PosConfigurationListResponse,
} from '../../../settings/models/pos-equipment.model';
import { POSService } from '../../services/pos.service';
import {
  OpenShiftDialogResult,
  PosSession,
  posSessionEquipmentLabel,
  posSessionUserLabel,
} from '../../models/pos-session.model';
import { isPosSessionNotFoundError } from '../../utils/pos-session.util';
import { CloseShiftDialogComponent } from '../close-shift-dialog/close-shift-dialog.component';

const LS_BRANCH = 'pos_billing_branch_id';

@Component({
  selector: 'app-open-shift-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './open-shift-dialog.component.html',
  styleUrls: ['./open-shift-dialog.component.scss'],
})
export class OpenShiftDialogComponent implements OnInit {
  warehouses = signal<Warehouse[]>([]);
  branches = signal<Branch[]>([]);
  selectedBranchId = signal<string>('');

  openingBalance = signal<number>(1000);
  notes = signal<string>('');
  loading = signal<boolean>(false);

  posConfigurations = signal<PosConfiguration[]>([]);
  selectedPosConfigurationId = signal<string>('');
  loadingEquipments = signal(false);

  activeSession = signal<PosSession | null>(null);
  checkingActiveSession = signal(false);
  closingSession = signal(false);
  sessionCheckError = signal<string | null>(null);

  constructor(
    private dialogRef: MatDialogRef<OpenShiftDialogComponent>,
    private dialog: MatDialog,
    private warehouseService: WarehouseService,
    private branchService: BranchService,
    private posEquipmentService: PosEquipmentService,
    private posService: POSService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.loadInitial();
  }

  private loadInitial(): void {
    this.loading.set(true);
    forkJoin({
      warehouses: this.warehouseService.getWarehouses().pipe(
        catchError(() => of({ data: [] } as WarehouseListResponse))
      ),
      branches: this.branchService.getAllBranches().pipe(catchError(() => of([] as Branch[]))),
    }).subscribe({
      next: ({ warehouses, branches }) => {
        this.warehouses.set(warehouses.data || []);
        const list = Array.isArray(branches) ? [...branches] : [];
        list.sort((a, b) =>
          this.branchLabel(a).localeCompare(this.branchLabel(b), undefined, { sensitivity: 'base' })
        );
        this.branches.set(list);

        const branchList = this.branches();
        const savedBranch = localStorage.getItem(LS_BRANCH);
        if (savedBranch && branchList.some((b) => b.id === savedBranch)) {
          this.selectedBranchId.set(savedBranch);
        } else if (branchList.length === 1) {
          this.selectedBranchId.set(branchList[0].id);
          localStorage.setItem(LS_BRANCH, branchList[0].id);
        }

        this.loading.set(false);
        this.loadPosConfigurations();
      },
      error: () => {
        this.loading.set(false);
      },
    });
  }

  onBranchChange(id: string): void {
    this.selectedBranchId.set(id);
    this.selectedPosConfigurationId.set('');
    this.clearActiveSessionState();
    if (id) {
      localStorage.setItem(LS_BRANCH, id);
    } else {
      localStorage.removeItem(LS_BRANCH);
    }
    this.loadPosConfigurations();
  }

  onEquipmentChange(id: string): void {
    this.selectedPosConfigurationId.set(id);
    this.checkActiveSessionForEquipment(id);
  }

  /** Almacén cuya sucursal de facturación coincide con `PosConfiguration.sucursal`. */
  resolveWarehouseId(config: PosConfiguration | undefined): string | null {
    if (!config?.sucursal?.trim()) {
      return null;
    }
    const sid = config.sucursal.trim();
    const match = this.warehouses().find((w) => (w.billing_branch_id || '').trim() === sid);
    return match?.id ?? null;
  }

  selectedConfiguration(): PosConfiguration | undefined {
    const id = this.selectedPosConfigurationId();
    return this.posConfigurations().find((c) => c.id === id);
  }

  loadPosConfigurations(): void {
    const sucursal = this.selectedBranchId().trim();
    if (!sucursal) {
      this.posConfigurations.set([]);
      this.selectedPosConfigurationId.set('');
      this.loadingEquipments.set(false);
      return;
    }

    this.loadingEquipments.set(true);
    const emptyList = of({ data: [] } as PosConfigurationListResponse);

    this.posEquipmentService
      .getPosConfigurations({ page: 1, limit: 100, sucursal })
      .pipe(catchError(() => emptyList))
      .subscribe((res) => {
        const active = (res.data || []).filter((c) => c.status === 1);
        active.sort((a, b) =>
          (a.code || '').localeCompare(b.code || '', undefined, { sensitivity: 'base' })
        );
        this.finishEquipmentLoad(active);
      });
  }

  private finishEquipmentLoad(active: PosConfiguration[]): void {
    this.posConfigurations.set(active);
    this.loadingEquipments.set(false);

    const saved = localStorage.getItem('pos_configuration_id');
    if (saved && active.some((c) => c.id === saved)) {
      this.selectedPosConfigurationId.set(saved);
      this.checkActiveSessionForEquipment(saved);
    } else if (active.length === 1) {
      this.selectedPosConfigurationId.set(active[0].id);
      this.checkActiveSessionForEquipment(active[0].id);
    } else {
      this.selectedPosConfigurationId.set('');
      this.clearActiveSessionState();
    }
  }

  private clearActiveSessionState(): void {
    this.activeSession.set(null);
    this.sessionCheckError.set(null);
    this.checkingActiveSession.set(false);
  }

  checkActiveSessionForEquipment(posConfigId: string): void {
    if (!posConfigId?.trim()) {
      this.clearActiveSessionState();
      return;
    }

    this.checkingActiveSession.set(true);
    this.sessionCheckError.set(null);
    this.activeSession.set(null);

    this.posService.getCurrentPosSession(posConfigId).subscribe({
      next: (session) => {
        this.activeSession.set(session?.id ? session : null);
        this.checkingActiveSession.set(false);
      },
      error: (error) => {
        if (isPosSessionNotFoundError(error)) {
          this.activeSession.set(null);
          this.sessionCheckError.set(null);
        } else {
          this.sessionCheckError.set(
            error?.error?.message || 'No se pudo verificar la sesión activa'
          );
        }
        this.checkingActiveSession.set(false);
      },
    });
  }

  warehouseResolved(): boolean {
    const cfg = this.selectedConfiguration();
    if (!cfg) {
      return false;
    }
    return this.resolveWarehouseId(cfg) != null;
  }

  branchLabel(b: Branch): string {
    return b.display_name?.trim() || b.code || b.id;
  }

  canSubmitOpen(): boolean {
    if (
      this.loading() ||
      this.loadingEquipments() ||
      this.checkingActiveSession() ||
      this.activeSession()
    ) {
      return false;
    }
    if (!this.selectedBranchId().trim()) {
      return false;
    }
    if (this.openingBalance() < 0) {
      return false;
    }
    const list = this.posConfigurations();
    if (list.length === 0) {
      return false;
    }
    const equipId = this.selectedPosConfigurationId();
    if (!equipId) {
      return false;
    }
    const cfg = list.find((c) => c.id === equipId);
    return cfg != null && this.resolveWarehouseId(cfg) != null;
  }

  canContinueSession(): boolean {
    return (
      !this.loading() &&
      !this.loadingEquipments() &&
      !this.checkingActiveSession() &&
      !this.closingSession() &&
      !!this.activeSession()?.id &&
      this.warehouseResolved()
    );
  }

  sessionUserLabel(session: PosSession | null): string {
    return posSessionUserLabel(session);
  }

  sessionEquipmentLabel(session: PosSession | null): string {
    const equip = this.selectedConfiguration();
    return posSessionEquipmentLabel(session, equip ? this.equipmentLabel(equip) : undefined);
  }

  formatOpenedAt(value?: string): string {
    if (!value) {
      return '—';
    }
    return new Date(value).toLocaleString('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  onConfirmOpen(): void {
    if (!this.canSubmitOpen()) {
      return;
    }

    const equip = this.selectedConfiguration();
    if (!equip) {
      return;
    }
    const warehouseId = this.resolveWarehouseId(equip);
    if (!warehouseId) {
      return;
    }

    const result: OpenShiftDialogResult = {
      action: 'open',
      warehouse_id: warehouseId,
      opening_balance: this.openingBalance(),
      notes: this.notes(),
      pos_configuration_id: equip.id,
      ...(equip.code ? { pos_configuration_code: equip.code } : {}),
    };
    this.dialogRef.close(result);
  }

  onContinueSession(): void {
    const session = this.activeSession();
    const equip = this.selectedConfiguration();
    if (!session?.id || !equip) {
      return;
    }
    const warehouseId = this.resolveWarehouseId(equip);
    if (!warehouseId) {
      return;
    }

    const result: OpenShiftDialogResult = {
      action: 'resume',
      session,
      warehouse_id: warehouseId,
      pos_configuration_id: equip.id,
      ...(equip.code ? { pos_configuration_code: equip.code } : {}),
    };
    this.dialogRef.close(result);
  }

  onCloseExistingSession(): void {
    const session = this.activeSession();
    if (!session?.id || this.closingSession()) {
      return;
    }

    const closeRef = this.dialog.open(CloseShiftDialogComponent, {
      width: '520px',
      maxWidth: '95vw',
      disableClose: true,
      panelClass: 'pos-dialog-panel',
      data: { shift: session },
    });

    closeRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }

      this.closingSession.set(true);
      this.posService
        .closePosSession(session.id, {
          closing_balance: result.closing_balance,
          notes: result.notes,
        })
        .subscribe({
          next: () => {
            this.closingSession.set(false);
            this.toast.success('Sesión cerrada. Ya puedes abrir una nueva.');
            this.activeSession.set(null);
            const equipId = this.selectedPosConfigurationId();
            if (equipId) {
              this.checkActiveSessionForEquipment(equipId);
            }
          },
          error: (error) => {
            this.closingSession.set(false);
            this.toast.error(error?.error?.message || 'Error al cerrar la sesión');
          },
        });
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  equipmentLabel(c: PosConfiguration): string {
    const parts = [c.code, c.modelo].filter(Boolean);
    return parts.join(' · ');
  }
}
