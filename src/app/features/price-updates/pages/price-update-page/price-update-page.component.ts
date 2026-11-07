import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
  signal,
} from '@angular/core';
import { forkJoin } from 'rxjs';
import { AuthService } from '../../../../core/services/auth.service';
import { ToastService } from '../../../../core/services/toast.service';
import { PRICE_UPDATE_PERMISSIONS } from '../../config/permissions.config';
import { PriceUpdateService } from '../../services/price-update.service';
import {
  PriceListColumn,
  ViewRow,
  ViewSlot,
  applyMarginPrices,
  editorValue,
  meanCost,
  parseAmount,
  refreshView,
  toView,
} from '../../utils/price-update-calc';

type CostField = 'c1' | 'c2' | 'pc';

interface EditState {
  productId: string;
  field: CostField | 'price';
  slotKey?: string;
  initial: string;
}

@Component({
  selector: 'app-price-update-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './price-update-page.component.html',
  styleUrl: './price-update-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriceUpdatePageComponent implements OnInit, OnDestroy {
  readonly lists = signal<PriceListColumn[]>([]);
  readonly rows = signal<ViewRow[]>([]);
  readonly loading = signal(false);
  readonly applying = signal(false);
  readonly page = signal(1);
  readonly total = signal(0);
  readonly editing = signal<EditState | null>(null);
  readonly savingIds = signal<ReadonlySet<string>>(new Set());
  readonly canEdit: boolean;
  readonly limit = 40;

  search = '';
  private searchTimer?: ReturnType<typeof setTimeout>;
  private skipCommit = false;
  private alive = true;

  constructor(
    private readonly priceUpdates: PriceUpdateService,
    private readonly toast: ToastService,
    auth: AuthService,
  ) {
    this.canEdit = auth.hasPermission(PRICE_UPDATE_PERMISSIONS.update);
  }

  ngOnInit(): void {
    this.load();
  }

  ngOnDestroy(): void {
    this.alive = false;
    clearTimeout(this.searchTimer);
  }

  pageCount(): number {
    return Math.max(1, Math.ceil(this.total() / this.limit));
  }

  onSearch(value: string): void {
    this.search = value;
    clearTimeout(this.searchTimer);
    this.searchTimer = setTimeout(() => {
      this.page.set(1);
      this.load();
    }, 280);
  }

  prev(): void {
    if (this.page() <= 1) return;
    this.page.update((page) => page - 1);
    this.load();
  }

  next(): void {
    if (this.page() >= this.pageCount()) return;
    this.page.update((page) => page + 1);
    this.load();
  }

  isSaving(productId: string): boolean {
    return this.savingIds().has(productId);
  }

  isEditingCost(productId: string, field: CostField): boolean {
    const edit = this.editing();
    return edit?.productId === productId && edit.field === field;
  }

  isEditingPrice(productId: string, slotKey: string): boolean {
    const edit = this.editing();
    return edit?.productId === productId && edit.field === 'price' && edit.slotKey === slotKey;
  }

  beginCost(row: ViewRow, field: CostField): void {
    if (!this.canEdit || this.isSaving(row.id)) return;
    const value = field === 'c1' ? row.cost1 : field === 'c2' ? row.cost2 : row.average;
    this.editing.set({ productId: row.id, field, initial: editorValue(value) });
    this.focusEditor();
  }

  beginPrice(row: ViewRow, slot: ViewSlot): void {
    if (!this.canEdit || !slot.uomId || this.isSaving(row.id)) return;
    const shown = slot.price ?? slot.calculated;
    this.editing.set({
      productId: row.id,
      field: 'price',
      slotKey: slot.key,
      initial: editorValue(shown),
    });
    this.focusEditor();
  }

  onEditorKey(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      event.preventDefault();
      (event.target as HTMLInputElement).blur();
      return;
    }
    if (event.key === 'Escape') {
      event.preventDefault();
      this.skipCommit = true;
      this.editing.set(null);
      (event.target as HTMLInputElement).blur();
    }
  }

  commitCost(row: ViewRow, field: CostField, raw: string): void {
    const edit = this.editing();
    if (this.skipCommit || !edit || edit.productId !== row.id || edit.field !== field) {
      this.skipCommit = false;
      return;
    }
    this.editing.set(null);
    const parsed = parseAmount(raw);
    if (parsed === 'invalid') {
      this.toast.show('Escribe un costo válido', 'error');
      return;
    }
    const cost1 = field === 'c1' ? parsed : row.cost1;
    const cost2 = field === 'c2' ? parsed : row.cost2;
    const average = field === 'pc' ? parsed : meanCost([cost1, cost2]);
    if (field === 'pc' && parsed === row.average) return;
    if (field === 'c1' && parsed === row.cost1) return;
    if (field === 'c2' && parsed === row.cost2) return;

    const previous = row;
    const next = refreshView({ ...row, cost1, cost2, average }, this.lists());
    const canRecalc =
      average != null &&
      next.uoms.length > 0 &&
      this.lists().some((list) => list.margin_percent != null);
    if (!canRecalc) {
      this.replaceRow(next);
      if (average == null) {
        this.toast.show('Sin costo para recalcular las listas', 'info');
      }
      return;
    }
    const withPrices = applyMarginPrices(next, this.lists());
    this.replaceRow(withPrices);
    this.saveAverage(withPrices, previous, average);
  }

  commitPrice(row: ViewRow, slot: ViewSlot, raw: string): void {
    const edit = this.editing();
    if (this.skipCommit || !edit || edit.slotKey !== slot.key || !slot.uomId) {
      this.skipCommit = false;
      return;
    }
    this.editing.set(null);
    const parsed = parseAmount(raw);
    if (parsed === 'invalid' || parsed == null) {
      this.toast.show('Escribe un precio válido', 'error');
      return;
    }
    if (slot.price != null && parsed === slot.price) return;

    const previous = row;
    const prices = row.prices.filter(
      (price) => !(price.price_list_id === slot.listId && price.product_uom_id === slot.uomId),
    );
    prices.push({ price_list_id: slot.listId, product_uom_id: slot.uomId, price: parsed });
    const next = refreshView({ ...row, prices }, this.lists());
    this.replaceRow(next);
    this.markSaving(row.id, true);
    this.priceUpdates
      .savePrice(row.id, { price_list_id: slot.listId, product_uom_id: slot.uomId, price: parsed })
      .subscribe({
        next: (saved) => {
          if (!this.alive) return;
          this.markSaving(row.id, false);
          const current = this.rows().find((item) => item.id === row.id) ?? next;
          this.replaceRow(refreshView({ ...current, prices: saved.prices }, this.lists()));
        },
        error: () => {
          if (!this.alive) return;
          this.markSaving(row.id, false);
          this.replaceRow(previous);
          this.toast.show('No se pudo guardar el precio', 'error');
        },
      });
  }

  applyMargins(): void {
    const lists = this.lists();
    if (!lists.some((list) => list.margin_percent != null)) {
      this.toast.show('Asigna un margen en las listas de precio', 'info');
      return;
    }
    const targets = this.rows().filter((row) => row.average != null && row.uoms.length > 0);
    if (!targets.length) {
      this.toast.show('No hay costos para aplicar', 'info');
      return;
    }
    this.applying.set(true);
    forkJoin(targets.map((row) => this.priceUpdates.saveAverage(row.id, row.average!))).subscribe({
      next: (savedRows) => {
        if (!this.alive) return;
        const byId = new Map(savedRows.map((row) => [row.id, row.prices]));
        this.rows.update((rows) =>
          rows.map((row) => {
            const prices = byId.get(row.id);
            return prices ? refreshView({ ...row, prices }, lists) : row;
          }),
        );
        this.applying.set(false);
        this.toast.show('Márgenes aplicados en esta página', 'success');
      },
      error: () => {
        if (!this.alive) return;
        this.applying.set(false);
        this.toast.show('No se pudieron aplicar los márgenes', 'error');
        this.load();
      },
    });
  }

  listTip(list: PriceListColumn): string {
    const margin = list.margin_percent == null ? 'Sin margen' : `Margen ${this.marginText(list)}`;
    return `${list.name} · ${margin}`;
  }

  marginText(list: PriceListColumn): string {
    if (list.margin_percent == null) return '—';
    return `${Number(list.margin_percent)}%`;
  }

  private load(): void {
    this.loading.set(true);
    this.editing.set(null);
    this.priceUpdates.getSheet(this.page(), this.limit, this.search).subscribe({
      next: (sheet) => {
        if (!this.alive) return;
        this.lists.set(sheet.price_lists);
        this.rows.set(sheet.data.map((row) => toView(row, sheet.price_lists)));
        this.total.set(sheet.meta.total);
        this.loading.set(false);
      },
      error: () => {
        if (!this.alive) return;
        this.loading.set(false);
        this.toast.show('No se pudo cargar la actualización de precio', 'error');
      },
    });
  }

  private saveAverage(next: ViewRow, previous: ViewRow, average: number): void {
    this.markSaving(next.id, true);
    this.priceUpdates.saveAverage(next.id, average).subscribe({
      next: (saved) => {
        if (!this.alive) return;
        this.markSaving(next.id, false);
        const current = this.rows().find((row) => row.id === next.id) ?? next;
        this.replaceRow(refreshView({ ...current, prices: saved.prices }, this.lists()));
      },
      error: () => {
        if (!this.alive) return;
        this.markSaving(next.id, false);
        this.replaceRow(previous);
        this.toast.show('No se pudo recalcular los precios', 'error');
      },
    });
  }

  private replaceRow(row: ViewRow): void {
    this.rows.update((rows) => rows.map((item) => (item.id === row.id ? row : item)));
  }

  private markSaving(productId: string, saving: boolean): void {
    this.savingIds.update((current) => {
      const next = new Set(current);
      if (saving) next.add(productId);
      else next.delete(productId);
      return next;
    });
  }

  private focusEditor(): void {
    queueMicrotask(() => {
      const editor = document.querySelector<HTMLInputElement>('.cell-editor');
      editor?.focus();
      editor?.select();
    });
  }
}
