import { Component, Inject, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ClipboardCheck, Search, X } from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular';
import { InventoryAuditService } from '../../services/inventory-audit.service';
import { InventoryService } from '../../services/inventory.service';
import {
  InventoryLocationBranch,
  InventoryLocationFiscal,
  InventoryLocationWarehouse,
} from '../../models/inventory-location.model';
import { InventorySummaryItem } from '../../models/inventory-item.model';
import { InventoryAuditContext } from '../../models/inventory-audit.model';
import { ToastService } from '../../../../core/services/toast.service';
import { RemoveTrailingZerosPipe } from '../../../../core/pipes/remove-trailing-zeros.pipe';
import { fiscalOptionLabel } from '../../utils/transfer-location.util';
import {
  contextLotId,
  contextLots,
  contextOpenAuditFolio,
  contextOpenAuditId,
} from '../../utils/inventory-audit.util';
import { AUDIT_DETAIL_DIALOG_OPTIONS } from '../../config/audit-dialog.config';
import { SpinnerComponent } from '../../../../core/components/spinner/spinner.component';

export interface CreateAuditDialogData {
  warehouse_id?: string;
  product_id?: string;
  fiscal_configuration_id?: string;
  billing_branch_id?: string;
}

@Component({
  selector: 'app-create-audit-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, RemoveTrailingZerosPipe, SpinnerComponent],
  templateUrl: './create-audit-dialog.component.html',
  styleUrl: './create-audit-dialog.component.scss',
})
export class CreateAuditDialogComponent implements OnInit {
  readonly X = X;
  readonly Search = Search;
  readonly ClipboardCheck = ClipboardCheck;

  locations = signal<InventoryLocationFiscal[]>([]);
  fiscalId = signal('');
  branchId = signal('');
  warehouseId = signal('');
  productId = signal('');
  productLabel = signal('');
  productSearch = signal('');
  productCandidates = signal<InventorySummaryItem[]>([]);
  includeEmptyLots = signal(false);
  notes = signal('');
  searchingProducts = signal(false);
  loadingContext = signal(false);
  submitting = signal(false);
  context = signal<InventoryAuditContext | null>(null);

  branches = computed(() =>
    this.locations().find((fiscal) => fiscal.id === this.fiscalId())?.branches ?? []
  );
  warehouses = computed(() =>
    this.branches().find((branch) => branch.id === this.branchId())?.warehouses ?? []
  );
  lots = computed(() => contextLots(this.context()));
  openAuditId = computed(() => contextOpenAuditId(this.context()));
  openAuditFolio = computed(() => contextOpenAuditFolio(this.context()));
  canCreate = computed(() => !!this.warehouseId() && !this.openAuditId() && !this.submitting());

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: CreateAuditDialogData,
    private dialogRef: MatDialogRef<CreateAuditDialogComponent, boolean>,
    private dialog: MatDialog,
    private auditService: InventoryAuditService,
    private inventoryService: InventoryService,
    private toast: ToastService
  ) {}

  ngOnInit(): void {
    this.inventoryService.getLocations().subscribe({
      next: (locations) => {
        this.locations.set(locations);
        this.applyInitialLocation();
      },
      error: (err) => this.toast.error(err?.message || 'No se pudo cargar el catálogo de ubicaciones'),
    });
  }

  fiscalLabel(fiscal: InventoryLocationFiscal): string {
    return fiscalOptionLabel(fiscal);
  }

  branchLabel(branch: InventoryLocationBranch): string {
    return branch.name;
  }

  warehouseLabel(wh: InventoryLocationWarehouse): string {
    return wh.name;
  }

  onFiscalChange(id: string): void {
    this.fiscalId.set(id);
    this.branchId.set('');
    this.warehouseId.set('');
    this.resetScope();
  }

  onBranchChange(id: string): void {
    this.branchId.set(id);
    this.warehouseId.set('');
    this.resetScope();
  }

  onWarehouseChange(id: string): void {
    this.warehouseId.set(id);
    this.resetScope();
    if (id) this.loadContext();
  }

  toggleEmptyLots(checked: boolean): void {
    this.includeEmptyLots.set(checked);
    if (this.warehouseId()) this.loadContext();
  }

  searchProducts(): void {
    const warehouseId = this.warehouseId();
    if (!warehouseId) {
      this.toast.error('Selecciona un almacén');
      return;
    }
    this.searchingProducts.set(true);
    this.inventoryService
      .getSummary(
        {
          warehouse_id: warehouseId,
          search: this.productSearch().trim() || undefined,
        },
        { page: 1, limit: 50 }
      )
      .subscribe({
        next: (response) => {
          this.productCandidates.set(response.data || []);
          this.searchingProducts.set(false);
        },
        error: (err) => {
          this.searchingProducts.set(false);
          this.toast.error(err?.message || 'No se pudieron buscar productos');
        },
      });
  }

  selectProduct(item: InventorySummaryItem): void {
    this.productId.set(item.product_id);
    this.productLabel.set(`${item.product_name} · ${item.product_sku}`);
    this.productCandidates.set([]);
    this.loadContext();
  }

  clearProduct(): void {
    this.productId.set('');
    this.productLabel.set('');
    this.productSearch.set('');
    this.productCandidates.set([]);
    if (this.warehouseId()) this.loadContext();
  }

  lotKey(lot: ReturnType<typeof contextLots>[number], index: number): string {
    return contextLotId(lot) || `${lot.batch_number}-${index}`;
  }

  openExisting(): void {
    const id = this.openAuditId();
    if (!id) return;
    this.dialogRef.close(false);
    void import('../audit-detail-dialog/audit-detail-dialog.component').then(({ AuditDetailDialogComponent }) => {
      this.dialog.open(AuditDetailDialogComponent, {
        ...AUDIT_DETAIL_DIALOG_OPTIONS,
        data: { auditId: id },
      });
    });
  }

  submit(): void {
    const warehouseId = this.warehouseId();
    if (!warehouseId || this.openAuditId() || this.submitting()) return;

    this.submitting.set(true);
    this.auditService
      .createAudit({
        warehouse_id: warehouseId,
        product_id: this.productId() || undefined,
        include_empty_lots: this.includeEmptyLots() || undefined,
        notes: this.notes().trim() || undefined,
      })
      .subscribe({
        next: (audit) => {
          this.submitting.set(false);
          this.toast.success(`${audit.folio} creada`);
          this.dialogRef.close(true);
          void import('../audit-detail-dialog/audit-detail-dialog.component').then(({ AuditDetailDialogComponent }) => {
            this.dialog.open(AuditDetailDialogComponent, {
              ...AUDIT_DETAIL_DIALOG_OPTIONS,
              data: { auditId: audit.id },
            });
          });
        },
        error: (err) => {
          this.submitting.set(false);
          this.toast.error(err?.message || 'No se pudo crear la auditoría');
        },
      });
  }

  close(): void {
    this.dialogRef.close(false);
  }

  private applyInitialLocation(): void {
    const locations = this.locations();
    const warehouseId = this.data?.warehouse_id;
    if (warehouseId) {
      for (const fiscal of locations) {
        for (const branch of fiscal.branches ?? []) {
          if ((branch.warehouses ?? []).some((wh) => wh.id === warehouseId)) {
            this.fiscalId.set(fiscal.id);
            this.branchId.set(branch.id);
            this.warehouseId.set(warehouseId);
            this.loadContext();
            return;
          }
        }
      }
    }

    const fiscalId = this.data?.fiscal_configuration_id;
    if (fiscalId && locations.some((item) => item.id === fiscalId)) {
      this.fiscalId.set(fiscalId);
      const branchId = this.data?.billing_branch_id;
      if (branchId && this.branches().some((item) => item.id === branchId)) {
        this.branchId.set(branchId);
      }
    }
  }

  private resetScope(): void {
    this.context.set(null);
    this.productCandidates.set([]);
  }

  private loadContext(): void {
    const warehouseId = this.warehouseId();
    if (!warehouseId) return;
    this.loadingContext.set(true);
    this.auditService
      .getContext(warehouseId, {
        product_id: this.productId() || undefined,
        include_empty_lots: this.includeEmptyLots(),
      })
      .subscribe({
        next: (ctx) => {
          this.context.set(ctx);
          this.loadingContext.set(false);
        },
        error: (err) => {
          this.loadingContext.set(false);
          this.toast.error(err?.message || 'No se pudo cargar el preview de lotes');
        },
      });
  }
}
