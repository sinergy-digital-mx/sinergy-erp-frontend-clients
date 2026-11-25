import { Component, DestroyRef, HostListener, effect, inject, signal, untracked } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LucideAngularModule, ChevronRight, ChevronDown, Settings } from 'lucide-angular';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastService } from '../../../../core/services/toast.service';
import { canViewInventoryMargin } from '../../utils/inventory-margin-access.util';
import { resolveHttpErrorMessage } from '../../../../core/utils/http-error-message.util';
import { InventorySummaryFilters, InventorySummaryItem } from '../../models/inventory-item.model';
import { InventoryService } from '../../services/inventory.service';
import { InventoryListState } from '../../services/inventory-list-state.service';
import { parseApiDateTime } from '../../../../core/utils/api-datetime.util';
import {
  formatInventoryNumber,
  inventoryLocationLabel,
  inventoryPageFromQuery,
  replaceInventoryQuery,
  stockedSummaryBatches,
} from '../../utils/inventory-list.util';
import {
  inventoryMeasureLabel,
  measureTotalLabel,
} from '../../../../core/utils/inventory-measure.util';
import { formatUnitCurrency } from '../../../../core/utils/unit-money.util';
import { BatchDetailDialogComponent } from '../batch-detail-dialog/batch-detail-dialog.component';
import { InventoryMarginChipComponent } from '../inventory-margin-chip/inventory-margin-chip.component';
import { BATCH_DETAIL_DIALOG_OPTIONS } from '../../../../core/config/batch-detail-dialog.config';
import { PRODUCT_DETAIL_DIALOG_CONFIG } from '../../../../core/config/form-dialog.config';
import { ProductDetailModalComponent } from '../../../settings/components/product-detail-modal/product-detail-modal.component';
import { SpinnerComponent } from '../../../../core/components/spinner/spinner.component';

interface SummaryRowMenu {
  key: string;
  item: InventorySummaryItem;
  x: number;
  y: number;
}

@Component({
  selector: 'app-inventory-summary-view',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, SpinnerComponent, InventoryMarginChipComponent],
  templateUrl: './inventory-summary-view.component.html',
  styleUrl: './inventory-summary-view.component.scss',
})
export class InventorySummaryViewComponent {
  private readonly inventoryService = inject(InventoryService);
  private readonly auth = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly dialog = inject(MatDialog);
  private readonly toast = inject(ToastService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  readonly state = inject(InventoryListState);
  private booted = false;

  readonly ChevronRight = ChevronRight;
  readonly ChevronDown = ChevronDown;
  readonly Settings = Settings;

  readonly items = signal<InventorySummaryItem[]>([]);
  readonly loading = signal(true);
  readonly total = signal(0);
  readonly page = signal(1);
  readonly limit = signal(20);
  readonly expandedItems = signal<Set<string>>(new Set());
  readonly rowMenu = signal<SummaryRowMenu | null>(null);
  readonly canViewMargin = signal(canViewInventoryMargin(this.auth));

  constructor() {
    this.auth.permissions$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.canViewMargin.set(canViewInventoryMargin(this.auth));
    });

    const closeOnScroll = () => {
      if (this.rowMenu()) this.rowMenu.set(null);
    };
    document.addEventListener('scroll', closeOnScroll, true);
    this.destroyRef.onDestroy(() => document.removeEventListener('scroll', closeOnScroll, true));

    effect(() => {
      if (!this.state.locationsReady()) return;
      this.state.listEpoch();
      const keepPage = this.state.keepPage();
      untracked(() => {
        if (!this.booted) {
          this.booted = true;
          this.page.set(inventoryPageFromQuery(this.route.snapshot.queryParamMap.get('spage')));
        } else if (!keepPage) {
          this.page.set(1);
          this.writePage(1);
        }
        this.loadSummary();
      });
    });
  }

  get totalPages(): number {
    return Math.ceil(this.total() / this.limit()) || 1;
  }

  locationLabel = inventoryLocationLabel;
  formatNumber = formatInventoryNumber;

  formatDate(value: string): string {
    const date = parseApiDateTime(value);
    if (!date) return '-';
    const month = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'][date.getMonth()];
    return `${month} ${date.getDate()} ${String(date.getFullYear()).slice(-2)}`;
  }
  measureLabel = inventoryMeasureLabel;
  measureTotalLabel = measureTotalLabel;

  stockedBatches(item: InventorySummaryItem) {
    return stockedSummaryBatches(item.batches);
  }

  unitMoney(value: string | null | undefined): string {
    if (value == null || value === '') return '—';
    return formatUnitCurrency(value);
  }

  onPageChange(nextPage: number): void {
    this.page.set(nextPage);
    this.writePage(nextPage);
    this.loadSummary();
  }

  itemKey(item: InventorySummaryItem): string {
    return `${item.product_id}_${item.warehouse_id}`;
  }

  toggleBatches(item: InventorySummaryItem): void {
    const key = this.itemKey(item);
    const expanded = this.expandedItems();
    if (expanded.has(key)) {
      expanded.delete(key);
    } else {
      expanded.add(key);
    }
    this.expandedItems.set(new Set(expanded));
  }

  isExpanded(item: InventorySummaryItem): boolean {
    return this.expandedItems().has(this.itemKey(item));
  }

  isRowMenu(item: InventorySummaryItem): boolean {
    return this.rowMenu()?.key === this.itemKey(item);
  }

  onRowClick(event: MouseEvent, item: InventorySummaryItem): void {
    const target = event.target as HTMLElement | null;
    if (target?.closest('button, a')) {
      this.rowMenu.set(null);
      return;
    }
    this.openRowMenu(event, item);
  }

  openProductConfig(item: InventorySummaryItem): void {
    this.rowMenu.set(null);
    if (!item.product_id) return;
    this.dialog
      .open(ProductDetailModalComponent, {
        ...PRODUCT_DETAIL_DIALOG_CONFIG,
        data: { product: { id: item.product_id }, isNew: false },
      })
      .afterClosed()
      .subscribe((changed) => {
        if (changed === true) this.state.reloadListKeepPage();
      });
  }

  expandFromMenu(item: InventorySummaryItem): void {
    this.rowMenu.set(null);
    this.toggleBatches(item);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement | null;
    if (target?.closest('.inv-row-menu, .summary-row')) return;
    this.rowMenu.set(null);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.rowMenu.set(null);
  }

  openBatchDetail(batchId: string): void {
    if (!batchId) return;
    this.dialog
      .open(BatchDetailDialogComponent, {
        ...BATCH_DETAIL_DIALOG_OPTIONS,
        data: { batchId },
      })
      .afterClosed()
      .subscribe((changed) => {
        if (changed === true) this.state.reloadListKeepPage();
      });
  }

  private writePage(page: number): void {
    replaceInventoryQuery(this.router, this.route, { spage: page > 1 ? page : null });
  }

  private openRowMenu(event: MouseEvent, item: InventorySummaryItem): void {
    const menuWidth = 240;
    const menuHeight = 84;
    const pad = 8;
    let x = event.clientX;
    let y = event.clientY;
    if (x + menuWidth > window.innerWidth - pad) x = window.innerWidth - menuWidth - pad;
    if (y + menuHeight > window.innerHeight - pad) y = event.clientY - menuHeight;
    this.rowMenu.set({
      key: this.itemKey(item),
      item,
      x: Math.max(pad, x),
      y: Math.max(pad, y),
    });
  }

  private loadSummary(): void {
    this.rowMenu.set(null);
    this.loading.set(true);

    const filters: InventorySummaryFilters = {
      search: this.state.searchTerm() || undefined,
      only_available: true,
      sort_by: 'total_available_quantity',
      sort_order: 'DESC',
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
