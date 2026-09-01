import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { EmptyStageComponent } from '../../../../core/components/empty-stage/empty-stage.component';
import { ToastService } from '../../../../core/services/toast.service';
import { Branch } from '../../../settings/models/branch.model';
import { BranchService } from '../../../settings/services/branch.service';
import {
  readCachedWarehouseControlBranchId,
  WarehouseControlPosition,
  writeCachedWarehouseControlBranchId,
} from '../../models/warehouse-control.model';
import { WarehouseControlService } from '../../services/warehouse-control.service';

@Component({
  selector: 'app-warehouse-control-positions',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink, EmptyStageComponent],
  templateUrl: './warehouse-control-positions.component.html',
  styleUrl: './warehouse-control-positions.component.scss',
})
export class WarehouseControlPositionsComponent implements OnInit {
  private branchService = inject(BranchService);
  private warehouseControlService = inject(WarehouseControlService);
  private toast = inject(ToastService);

  branches = signal<Branch[]>([]);
  positions = signal<WarehouseControlPosition[]>([]);
  loading = signal(false);
  saving = signal(false);
  editingId = signal<string | null>(null);
  selectedBranchId = '';
  readonly emptyParams = { icon_size: 28, width: 56, height: 56, row_gap: 10 };

  form = inject(FormBuilder).nonNullable.group({
    code: ['', Validators.required],
    name: [''],
    row: [0, Validators.required],
    col: [0, Validators.required],
    sort_order: [0],
  });

  previewGrid = computed(() => {
    const positions = this.positions();
    if (!positions.length) {
      return { columns: 0, cells: [] as Array<{ key: string; position: WarehouseControlPosition | null }> };
    }
    const maxRow = Math.max(...positions.map((p) => Number(p.row) || 0));
    const maxCol = Math.max(...positions.map((p) => Number(p.col) || 0));
    const byKey = new Map(positions.map((p) => [`${Number(p.row) || 0}:${Number(p.col) || 0}`, p]));
    const cells: Array<{ key: string; position: WarehouseControlPosition | null }> = [];
    for (let row = 0; row <= maxRow; row += 1) {
      for (let col = 0; col <= maxCol; col += 1) {
        cells.push({
          key: `${row}:${col}`,
          position: byKey.get(`${row}:${col}`) ?? null,
        });
      }
    }
    return { columns: maxCol + 1, cells };
  });

  ngOnInit(): void {
    this.branchService.getAllBranches().subscribe({
      next: (branches) => {
        const list = branches || [];
        this.branches.set(list);
        const cached = readCachedWarehouseControlBranchId();
        if (cached && list.some((branch) => branch.id === cached)) {
          this.selectedBranchId = cached;
          this.loadPositions();
        }
      },
      error: () => this.branches.set([]),
    });
  }

  onBranchChange(): void {
    writeCachedWarehouseControlBranchId(this.selectedBranchId);
    this.resetForm();
    this.loadPositions();
  }

  loadPositions(): void {
    if (!this.selectedBranchId) {
      this.positions.set([]);
      return;
    }
    this.loading.set(true);
    this.warehouseControlService.listPositions(this.selectedBranchId).subscribe({
      next: (rows) => {
        this.positions.set(rows);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        this.positions.set([]);
        this.toast.error(err?.error?.message || 'No se pudieron cargar las posiciones');
      },
    });
  }

  startEdit(position: WarehouseControlPosition): void {
    this.editingId.set(position.id);
    this.form.setValue({
      code: position.code || '',
      name: position.name || '',
      row: Number(position.row) || 0,
      col: Number(position.col) || 0,
      sort_order: Number(position.sort_order) || 0,
    });
  }

  resetForm(): void {
    this.editingId.set(null);
    this.form.reset({ code: '', name: '', row: 0, col: 0, sort_order: 0 });
  }

  save(): void {
    if (!this.selectedBranchId || this.form.invalid || this.saving()) return;
    this.saving.set(true);
    const value = this.form.getRawValue();
    const payload = {
      billing_branch_id: this.selectedBranchId,
      code: value.code.trim(),
      name: value.name.trim() || undefined,
      row: Number(value.row) || 0,
      col: Number(value.col) || 0,
      sort_order: Number(value.sort_order) || 0,
    };
    const editingId = this.editingId();
    const request = editingId
      ? this.warehouseControlService.updatePosition(editingId, payload)
      : this.warehouseControlService.createPosition(payload);

    request.subscribe({
      next: () => {
        this.saving.set(false);
        this.toast.success(editingId ? 'Posición actualizada' : 'Posición creada');
        this.resetForm();
        this.loadPositions();
      },
      error: (err) => {
        this.saving.set(false);
        this.toast.error(err?.error?.message || 'No se pudo guardar la posición');
      },
    });
  }

  remove(position: WarehouseControlPosition): void {
    if (position.occupied) {
      this.toast.error('No se puede borrar una posición ocupada');
      return;
    }
    if (!confirm(`¿Eliminar la posición ${position.code}?`)) return;
    this.warehouseControlService.deletePosition(position.id).subscribe({
      next: () => {
        this.toast.success('Posición eliminada');
        if (this.editingId() === position.id) this.resetForm();
        this.loadPositions();
      },
      error: (err) => {
        this.toast.error(err?.error?.message || 'No se pudo eliminar la posición');
      },
    });
  }

  branchLabel(branch: Branch): string {
    return branch.display_name || branch.code || branch.id;
  }
}
