import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from '../../../../core/components/spinner/spinner.component';
import { ToastService } from '../../../../core/services/toast.service';
import { resolveHttpErrorMessage } from '../../../../core/utils/http-error-message.util';
import {
  InventoryBatchMovement,
  InventoryBatchMovementChange,
  batchMovementChipTone,
  metadataString,
  sortBatchMovements,
} from '../../models/inventory-batch-movement.model';
import { InventoryBatchService } from '../../services/inventory-batch.service';

export type BatchMovementReferenceKind = 'sales' | 'purchase' | 'transfer' | 'audit' | 'batch';

export interface BatchMovementsLoadedEvent {
  data: InventoryBatchMovement[];
  total: number;
}

@Component({
  selector: 'app-inventory-batch-movements-tab',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  templateUrl: './inventory-batch-movements-tab.component.html',
  styleUrl: './inventory-batch-movements-tab.component.scss',
})
export class InventoryBatchMovementsTabComponent implements OnChanges {
  private readonly batchService = inject(InventoryBatchService);
  private readonly toast = inject(ToastService);

  @Input() batchId = '';
  @Input() movements: InventoryBatchMovement[] | null | undefined;
  @Input() total = 0;

  @Output() openReference = new EventEmitter<{ kind: BatchMovementReferenceKind; id: string }>();
  @Output() movementsLoaded = new EventEmitter<BatchMovementsLoadedEvent>();

  readonly items = signal<InventoryBatchMovement[]>([]);
  readonly loading = signal(false);
  readonly selectedType = signal<string>('');
  private fetchedForBatchId = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['batchId'] && !changes['batchId'].firstChange) {
      this.selectedType.set('');
      this.fetchedForBatchId = '';
    }

    const incoming = this.movements;
    if (Array.isArray(incoming) && incoming.length > 0) {
      this.items.set(sortBatchMovements(incoming));
      return;
    }

    if (this.batchId && this.fetchedForBatchId !== this.batchId) {
      this.refresh();
    }
  }

  displayedItems(): InventoryBatchMovement[] {
    const type = this.selectedType();
    const list = this.items();
    return type ? list.filter((item) => item.type === type) : list;
  }

  filterTypes(): Array<{ type: string; label: string }> {
    const seen = new Map<string, string>();
    for (const item of this.items()) {
      if (item.type && !seen.has(item.type)) {
        seen.set(item.type, item.type_label || item.type);
      }
    }
    return [...seen.entries()].map(([type, label]) => ({ type, label }));
  }

  setType(type: string): void {
    this.selectedType.set(type);
  }

  chipTone(item: InventoryBatchMovement): string {
    return batchMovementChipTone(item.type);
  }

  actorName(item: InventoryBatchMovement): string {
    return item.actor_name?.trim() || '—';
  }

  authorizedBy(item: InventoryBatchMovement): string | null {
    const name = item.authorized_by_name?.trim();
    return name || null;
  }

  movementTitle(item: InventoryBatchMovement): string {
    return item.title?.trim() || item.type_label || 'Movimiento';
  }

  movementText(item: InventoryBatchMovement): string {
    return item.description?.trim() || item.title?.trim() || item.type_label || '—';
  }

  hasChanges(item: InventoryBatchMovement): boolean {
    return (item.changes?.length ?? 0) > 0;
  }

  changeLabel(change: InventoryBatchMovementChange): string {
    return change.field_label?.trim() || change.field || 'Campo';
  }

  quantityClass(item: InventoryBatchMovement): string {
    if (item.direction === 'in') return 'qty qty--in';
    if (item.direction === 'out' || item.type === 'stock_sold') return 'qty qty--out';
    if (item.direction === 'adjust' || item.type === 'inventory_adjusted') return 'qty qty--adjust';
    return 'qty';
  }

  formatQuantity(item: InventoryBatchMovement): string {
    if (item.quantity === null || item.quantity === undefined || item.quantity === '') {
      return '';
    }
    const raw = String(item.quantity);
    const direction = item.direction || (item.type === 'stock_sold' ? 'out' : item.type === 'inventory_adjusted' ? 'adjust' : '');
    if (direction === 'in') {
      return raw.startsWith('+') ? raw : `+${raw}`;
    }
    if (direction === 'out') {
      return raw.startsWith('-') || raw.startsWith('−') ? raw.replace('-', '−') : `−${raw}`;
    }
    return raw.replace('-', '−');
  }

  formatOccurredAt(value?: string | null): string {
    if (!value) {
      return '—';
    }
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
      return '—';
    }
    return new Intl.DateTimeFormat('es-MX', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    }).format(date);
  }

  metaLinks(item: InventoryBatchMovement): Array<{ kind: BatchMovementReferenceKind; id: string; label: string }> {
    const meta = item.metadata;
    const links: Array<{ kind: BatchMovementReferenceKind; id: string; label: string }> = [];
    const salesId = metadataString(meta, 'sales_order_id');
    const salesFolio = metadataString(meta, 'sales_order_folio');
    if (salesId) {
      links.push({ kind: 'sales', id: salesId, label: salesFolio || 'Orden de venta' });
    }
    const purchaseId = metadataString(meta, 'purchase_order_id');
    const purchaseFolio = metadataString(meta, 'purchase_order_folio');
    if (purchaseId) {
      links.push({ kind: 'purchase', id: purchaseId, label: purchaseFolio || 'Orden de compra' });
    }
    const transferId = metadataString(meta, 'transfer_id');
    const transferFolio = metadataString(meta, 'transfer_folio');
    if (transferId) {
      links.push({ kind: 'transfer', id: transferId, label: transferFolio || 'Transferencia' });
    }
    const auditId = metadataString(meta, 'audit_id');
    const auditFolio = metadataString(meta, 'audit_folio');
    if (auditId) {
      links.push({ kind: 'audit', id: auditId, label: auditFolio || 'Auditoría' });
    }
    const relatedBatchId = metadataString(meta, 'related_batch_id');
    const relatedBatchNumber = metadataString(meta, 'related_batch_number');
    if (relatedBatchId) {
      links.push({ kind: 'batch', id: relatedBatchId, label: relatedBatchNumber || 'Lote' });
    }
    return links;
  }

  extraMeta(item: InventoryBatchMovement): string[] {
    const meta = item.metadata;
    const rows: string[] = [];
    const warehouse = metadataString(meta, 'warehouse_name');
    const customer = metadataString(meta, 'customer_name');
    const tag = metadataString(meta, 'source_tag_identifier');
    const reason = metadataString(meta, 'reason');
    const orderType = metadataString(meta, 'sales_order_type');
    if (warehouse) rows.push(warehouse);
    if (customer) rows.push(customer);
    if (orderType) rows.push(orderType);
    if (tag) rows.push(tag);
    if (reason) rows.push(reason);
    return rows;
  }

  hasExpandableDetail(item: InventoryBatchMovement): boolean {
    return this.metaLinks(item).length > 0 || this.extraMeta(item).length > 0;
  }

  emitReference(kind: BatchMovementReferenceKind, id: string): void {
    this.openReference.emit({ kind, id });
  }

  refresh(): void {
    if (!this.batchId || this.loading()) {
      return;
    }
    this.loading.set(true);
    this.fetchedForBatchId = this.batchId;
    this.batchService.getBatchMovements(this.batchId).subscribe({
      next: (response) => {
        const data = response.data ?? [];
        this.items.set(data);
        this.loading.set(false);
        this.movementsLoaded.emit({ data, total: response.total ?? data.length });
      },
      error: (err) => {
        this.loading.set(false);
        this.toast.error(resolveHttpErrorMessage(err, 'No se pudo cargar el historial'));
      },
    });
  }
}
