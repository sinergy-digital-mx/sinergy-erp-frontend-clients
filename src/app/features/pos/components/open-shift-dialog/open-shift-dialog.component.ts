import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { forkJoin, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { WarehouseService } from '../../../settings/services/warehouse.service';
import { BranchService } from '../../../settings/services/branch.service';
import { PosEquipmentService } from '../../../settings/services/pos-equipment.service';
import { Warehouse, WarehouseListResponse } from '../../../settings/models/warehouse.model';
import { Branch } from '../../../settings/models/branch.model';
import {
  PosConfiguration,
  PosConfigurationListResponse,
} from '../../../settings/models/pos-equipment.model';

const LS_BRANCH = 'pos_billing_branch_id';

export interface OpenShiftDialogResult {
  warehouse_id: string;
  opening_balance: number;
  notes: string;
  pos_configuration_id?: string;
  pos_configuration_code?: string;
}

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

  constructor(
    private dialogRef: MatDialogRef<OpenShiftDialogComponent>,
    private warehouseService: WarehouseService,
    private branchService: BranchService,
    private posEquipmentService: PosEquipmentService
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
    if (id) {
      localStorage.setItem(LS_BRANCH, id);
    } else {
      localStorage.removeItem(LS_BRANCH);
    }
    this.loadPosConfigurations();
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
    } else if (active.length === 1) {
      this.selectedPosConfigurationId.set(active[0].id);
    } else {
      this.selectedPosConfigurationId.set('');
    }
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

  canSubmit(): boolean {
    if (this.loading() || this.loadingEquipments()) {
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

  onConfirm(): void {
    if (!this.canSubmit()) {
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
      warehouse_id: warehouseId,
      opening_balance: this.openingBalance(),
      notes: this.notes(),
      pos_configuration_id: equip.id,
      ...(equip.code ? { pos_configuration_code: equip.code } : {}),
    };
    this.dialogRef.close(result);
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  equipmentLabel(c: PosConfiguration): string {
    const parts = [c.code, c.modelo].filter(Boolean);
    return parts.join(' · ');
  }
}
