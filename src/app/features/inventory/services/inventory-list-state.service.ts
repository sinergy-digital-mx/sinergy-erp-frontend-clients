import { Injectable, signal } from '@angular/core';
import { InventoryLocationFilters } from '../models/inventory-location.model';

/**
 * Filtros del listado de inventario. Vive en el shell para que
 * Por Lotes y Totalizado compartan la misma selección al cambiar de ruta.
 */
@Injectable()
export class InventoryListState {
  readonly searchTerm = signal('');
  readonly selectedFiscalId = signal('');
  readonly selectedBranchId = signal('');
  readonly selectedWarehouseId = signal('');

  /** True cuando ya se aplicó la razón social inicial (o no hay catálogo). */
  readonly locationsReady = signal(false);
  /** Incrementar para recargar el listado activo (sin recargar stats). */
  readonly listEpoch = signal(0);
  /** Incrementar para recargar stats desde una vista hija. */
  readonly statsEpoch = signal(0);

  locationFilters(): InventoryLocationFilters {
    const fiscalId = this.selectedFiscalId() || undefined;
    const branchId = fiscalId ? (this.selectedBranchId() || undefined) : undefined;
    const warehouseId = branchId ? (this.selectedWarehouseId() || undefined) : undefined;
    return {
      fiscal_configuration_id: fiscalId,
      billing_branch_id: branchId,
      warehouse_id: warehouseId,
    };
  }

  reloadList(): void {
    this.listEpoch.update((n) => n + 1);
  }

  reloadStats(): void {
    this.statsEpoch.update((n) => n + 1);
  }

  reloadAll(): void {
    this.reloadStats();
    this.reloadList();
  }
}
