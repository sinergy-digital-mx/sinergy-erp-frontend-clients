import { Component, effect, inject, signal, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { LucideAngularModule, ChevronRight, ChevronDown, ArrowRightLeft } from 'lucide-angular';
import { PERMISSIONS } from '../../../../core/config/permissions.config';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastService } from '../../../../core/services/toast.service';
import { resolveHttpErrorMessage } from '../../../../core/utils/http-error-message.util';
import { InventorySummaryFilters, InventorySummaryItem } from '../../models/inventory-item.model';
import { InventoryService } from '../../services/inventory.service';
import { InventoryListState } from '../../services/inventory-list-state.service';
import {
  formatInventoryDate,
  formatInventoryNumber,
  inventoryLocationLabel,
} from '../../utils/inventory-list.util';
import { CreateTransferDialogComponent } from '../create-transfer-dialog/create-transfer-dialog.component';
import { BatchDetailDialogComponent } from '../batch-detail-dialog/batch-detail-dialog.component';

@Component({
  selector: 'app-inventory-summary-view',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './inventory-summary-view.component.html',
  styleUrl: './inventory-summary-view.component.scss',
})
export class InventorySummaryViewComponent {
  private readonly inventoryService = inject(InventoryService);
  private readonly dialog = inject(MatDialog);
  private readonly toast = inject(ToastService);
  private readonly authService = inject(AuthService);
  readonly state = inject(InventoryListState);

  readonly ChevronRight = ChevronRight;
  readonly ChevronDown = ChevronDown;
  readonly ArrowRightLeft = ArrowRightLeft;

  readonly items = signal<InventorySummaryItem[]>([]);
  readonly loading = signal(true);
  readonly total = signal(0);
  readonly page = signal(1);
  readonly limit = signal(20);
  readonly expandedItems = signal<Set<string>>(new Set());

  constructor() {
    effect(() => {
      if (!this.state.locationsReady()) return;
      this.state.listEpoch();
      untracked(() => {
        this.page.set(1);
        this.loadSummary();
      });
    });
  }

  get canCreateTransfer(): boolean {
    return (
      this.authService.hasPermission(PERMISSIONS.inventory.write) ||
      this.authService.hasPermission(PERMISSIONS.inventory.transfer) ||
      this.authService.hasPermission(PERMISSIONS.inventory.create)
    );
  }

  get totalPages(): number {
    return Math.ceil(this.total() / this.limit()) || 1;
  }

  locationLabel = inventoryLocationLabel;
  formatDate = formatInventoryDate;
  formatNumber = formatInventoryNumber;

  onPageChange(nextPage: number): void {
    this.page.set(nextPage);
    this.loadSummary();
  }

  toggleBatches(item: InventorySummaryItem): void {
    const key = `${item.product_id}_${item.warehouse_id}`;
    const expanded = this.expandedItems();
    if (expanded.has(key)) {
      expanded.delete(key);
    } else {
      expanded.add(key);
    }
    this.expandedItems.set(new Set(expanded));
  }

  isExpanded(item: InventorySummaryItem): boolean {
    return this.expandedItems().has(`${item.product_id}_${item.warehouse_id}`);
  }

  openBatchDetail(batchId: string): void {
    if (!batchId) return;
    this.dialog.open(BatchDetailDialogComponent, {
      data: { batchId },
      width: 'min(1120px, 96vw)',
      maxWidth: '96vw',
      maxHeight: '90vh',
    });
  }

  openTransfer(item: InventorySummaryItem, event?: Event): void {
    event?.stopPropagation();
    this.dialog
      .open(CreateTransferDialogComponent, {
        data: {
          product_id: item.product_id,
          warehouse_id: item.warehouse_id,
          uom_id: item.uom_id,
        },
        width: 'min(1100px, 96vw)',
        height: '720px',
        maxWidth: '96vw',
        maxHeight: '92vh',
        panelClass: 'transfer-dialog-panel',
      })
      .afterClosed()
      .subscribe((success) => {
        if (success) {
          this.state.reloadAll();
        }
      });
  }

  private loadSummary(): void {
    this.loading.set(true);

    const filters: InventorySummaryFilters = {
      search: this.state.searchTerm() || undefined,
      only_available: true,
      ...this.state.locationFilters(),
    };

    this.inventoryService.getSummary(filters, { page: this.page(), limit: this.limit() }).subscribe({
      next: (response) => {
        this.items.set(response.data || []);
        this.total.set(response.total || 0);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        this.toast.error(resolveHttpErrorMessage(err, 'No se pudo cargar el inventario totalizado'));
      },
    });
  }
}
