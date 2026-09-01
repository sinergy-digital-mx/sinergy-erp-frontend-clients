import { Component, effect, inject, signal, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { LucideAngularModule, ChevronRight, ChevronDown } from 'lucide-angular';
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
import {
  formatMeasureTotalsLine,
  hasMeasureTotals,
  inventoryMeasureLabel,
} from '../../../../core/utils/inventory-measure.util';
import { BatchDetailDialogComponent } from '../batch-detail-dialog/batch-detail-dialog.component';
import { BATCH_DETAIL_DIALOG_OPTIONS } from '../../../../core/config/batch-detail-dialog.config';
import { SpinnerComponent } from '../../../../core/components/spinner/spinner.component';

@Component({
  selector: 'app-inventory-summary-view',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, SpinnerComponent],
  templateUrl: './inventory-summary-view.component.html',
  styleUrl: './inventory-summary-view.component.scss',
})
export class InventorySummaryViewComponent {
  private readonly inventoryService = inject(InventoryService);
  private readonly dialog = inject(MatDialog);
  private readonly toast = inject(ToastService);
  readonly state = inject(InventoryListState);

  readonly ChevronRight = ChevronRight;
  readonly ChevronDown = ChevronDown;

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

  get totalPages(): number {
    return Math.ceil(this.total() / this.limit()) || 1;
  }

  locationLabel = inventoryLocationLabel;
  formatDate = formatInventoryDate;
  formatNumber = formatInventoryNumber;
  measureLabel = inventoryMeasureLabel;

  hasMeasureBreakdown(item: InventorySummaryItem): boolean {
    return hasMeasureTotals(item.measure_totals);
  }

  measureTotalsLine(item: InventorySummaryItem): string {
    return formatMeasureTotalsLine(item.measure_totals, formatInventoryNumber);
  }

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
      ...BATCH_DETAIL_DIALOG_OPTIONS,
      data: { batchId },
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
