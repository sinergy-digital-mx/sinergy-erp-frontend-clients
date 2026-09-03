import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RemoveTrailingZerosPipe } from '../../../../core/pipes/remove-trailing-zeros.pipe';
import { inventoryMeasureLabel } from '../../../../core/utils/inventory-measure.util';
import { formatUnitAmount } from '../../../../core/utils/unit-money.util';
import {
  PurchaseOrderBatchesSummary,
  PurchaseOrderLotNode,
  purchaseOrderLotHasChildren,
  purchaseOrderQtyNumber,
  purchaseOrderReceivedLots,
} from '../../models/purchase-order-lot.model';
import { PaymentCurrency } from '../../models/purchase-order.model';

export interface PurchaseOrderLotRow {
  lot: PurchaseOrderLotNode;
  depth: number;
  isMigration: boolean;
}

@Component({
  selector: 'app-purchase-order-lots-tab',
  standalone: true,
  imports: [CommonModule, RemoveTrailingZerosPipe],
  templateUrl: './purchase-order-lots-tab.component.html',
  styleUrl: './purchase-order-lots-tab.component.scss',
})
export class PurchaseOrderLotsTabComponent {
  @Input() lots: PurchaseOrderLotNode[] = [];
  @Input() summary: PurchaseOrderBatchesSummary | null = null;
  @Input() currency: PaymentCurrency = 'MXN';
  @Output() openBatch = new EventEmitter<string>();

  collapsedIds = new Set<string>();

  receivedLots(): PurchaseOrderLotNode[] {
    return purchaseOrderReceivedLots(this.lots);
  }

  visibleRows(): PurchaseOrderLotRow[] {
    const rows: PurchaseOrderLotRow[] = [];
    const walk = (lot: PurchaseOrderLotNode, depth: number, isMigration: boolean) => {
      rows.push({ lot, depth, isMigration });
      if (this.isExpanded(lot)) {
        for (const child of lot.migrated_to ?? []) {
          walk(child, depth + 1, true);
        }
      }
    };
    for (const lot of this.receivedLots()) {
      walk(lot, 0, false);
    }
    return rows;
  }

  summaryUom(): string {
    return this.receivedLots()[0]?.uom_name?.trim()
      || this.receivedLots()[0]?.uom?.name?.trim()
      || '';
  }

  hasChildren(lot: PurchaseOrderLotNode): boolean {
    return purchaseOrderLotHasChildren(lot);
  }

  isExpanded(lot: PurchaseOrderLotNode): boolean {
    return this.hasChildren(lot) && !this.collapsedIds.has(this.lotKey(lot));
  }

  toggle(lot: PurchaseOrderLotNode, event?: Event): void {
    event?.stopPropagation();
    if (!this.hasChildren(lot)) {
      return;
    }
    const key = this.lotKey(lot);
    if (this.collapsedIds.has(key)) {
      this.collapsedIds.delete(key);
    } else {
      this.collapsedIds.add(key);
    }
  }

  lotKey(lot: PurchaseOrderLotNode): string {
    return lot.id || lot.batch_number;
  }

  productName(lot: PurchaseOrderLotNode): string {
    return lot.product_name?.trim() || lot.product?.name?.trim() || 'N/A';
  }

  productSku(lot: PurchaseOrderLotNode): string {
    return lot.product_sku?.trim() || lot.product?.sku?.trim() || '';
  }

  warehouseName(lot: PurchaseOrderLotNode): string {
    return lot.warehouse_name?.trim() || lot.warehouse?.name?.trim() || '—';
  }

  branchName(lot: PurchaseOrderLotNode): string {
    return lot.sucursal?.trim() || '—';
  }

  uomName(lot: PurchaseOrderLotNode): string {
    return lot.uom_name?.trim() || lot.uom?.name?.trim() || '';
  }

  hasMeasure(lot: PurchaseOrderLotNode): boolean {
    return inventoryMeasureLabel(lot, '') !== '';
  }

  measureLabel(lot: PurchaseOrderLotNode): string {
    return inventoryMeasureLabel(lot, '');
  }

  showConsumed(lot: PurchaseOrderLotNode): boolean {
    return purchaseOrderQtyNumber(lot.consumed_quantity) > 0;
  }

  hasMigrated(lot: PurchaseOrderLotNode): boolean {
    return purchaseOrderQtyNumber(lot.migrated_quantity) > 0;
  }

  movedQuantity(lot: PurchaseOrderLotNode): string | number {
    return lot.transfer?.quantity ?? lot.received_quantity ?? '0';
  }

  destinationBranch(lot: PurchaseOrderLotNode): string {
    return lot.transfer?.destination_sucursal?.trim() || lot.sucursal?.trim() || '—';
  }

  destinationWarehouse(lot: PurchaseOrderLotNode): string {
    return lot.transfer?.destination_warehouse_name?.trim()
      || lot.warehouse_name?.trim()
      || lot.warehouse?.name?.trim()
      || '—';
  }

  transferFolio(lot: PurchaseOrderLotNode): string {
    return lot.transfer?.transfer_folio?.trim() || '';
  }

  transferWhen(lot: PurchaseOrderLotNode): string {
    const who = lot.transfer?.transferred_by_name?.trim() || '';
    const when = this.formatDateTime(lot.transfer?.transferred_at);
    if (who && when !== '—') {
      return `${who} · ${when}`;
    }
    return who || when;
  }

  hasRealCostColumns(): boolean {
    return this.receivedLots().some((lot) => this.hasRealCost(lot));
  }

  hasRealCost(lot: PurchaseOrderLotNode): boolean {
    return lot.real_unit_cost_usd != null || lot.real_unit_cost_mxn != null;
  }

  formatOptionalUnitCost(value: number | string | null | undefined): string {
    if (value === null || value === undefined || value === '') {
      return '—';
    }
    return this.formatUnitCost(value);
  }

  formatUnitCost(value: number | string | null | undefined): string {
    return formatUnitAmount(value);
  }

  formatAmount(value: number | string | null | undefined): string {
    return new Intl.NumberFormat('es-MX', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(purchaseOrderQtyNumber(value));
  }

  formatDateTime(value?: string | null): string {
    if (!value) {
      return '—';
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return '—';
    }
    const day = new Intl.DateTimeFormat('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(date);
    const time = new Intl.DateTimeFormat('es-MX', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(date);
    return `${day} ${time}`;
  }

  onOpenBatch(lot: PurchaseOrderLotNode, event?: Event): void {
    event?.stopPropagation();
    if (lot.id) {
      this.openBatch.emit(lot.id);
    }
  }
}
