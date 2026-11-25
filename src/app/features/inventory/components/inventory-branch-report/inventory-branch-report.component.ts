import { Component, DestroyRef, ElementRef, HostListener, OnInit, computed, inject, signal, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CdkDragDrop, CdkDrag, CdkDragHandle, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { LucideAngularModule, GripVertical, Settings, X } from 'lucide-angular';
import { AuthService } from '../../../../core/services/auth.service';
import { InventoryService } from '../../services/inventory.service';
import { canViewInventoryMargin } from '../../utils/inventory-margin-access.util';
import { InventoryListState } from '../../services/inventory-list-state.service';
import { ToastService } from '../../../../core/services/toast.service';
import { resolveHttpErrorMessage } from '../../../../core/utils/http-error-message.util';
import { formatUnitCurrency } from '../../../../core/utils/unit-money.util';
import { formatInventoryNumber } from '../../utils/inventory-list.util';
import { SpinnerComponent } from '../../../../core/components/spinner/spinner.component';
import {
  BranchReportLine,
  BranchReportProductHit,
  BranchReportSettings,
  BranchStockReport,
} from '../../models/branch-stock-report.model';

interface BranchReportGroup {
  id: string;
  name: string;
  city: string | null;
  company: string | null;
  empty: boolean;
  lines: BranchReportLine[];
}

@Component({
  selector: 'app-inventory-branch-report',
  standalone: true,
  imports: [CommonModule, LucideAngularModule, SpinnerComponent, CdkDropList, CdkDrag, CdkDragHandle],
  templateUrl: './inventory-branch-report.component.html',
  styleUrl: './inventory-branch-report.component.scss',
})
export class InventoryBranchReportComponent implements OnInit {
  get canViewMargin(): boolean {
    return canViewInventoryMargin(this.auth);
  }

  private readonly inventoryService = inject(InventoryService);
  private readonly auth = inject(AuthService);
  private readonly listState = inject(InventoryListState);
  private readonly route = inject(ActivatedRoute);
  private readonly toast = inject(ToastService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly searchRoot = viewChild<ElementRef<HTMLElement>>('searchRoot');

  readonly Settings = Settings;
  readonly X = X;
  readonly GripVertical = GripVertical;

  readonly query = signal('');
  readonly results = signal<BranchReportProductHit[]>([]);
  readonly resultsOpen = signal(false);
  readonly searching = signal(false);
  readonly selected = signal<BranchReportProductHit | null>(null);
  readonly report = signal<BranchStockReport | null>(null);
  readonly reportLoading = signal(false);
  readonly settings = signal<BranchReportSettings | null>(null);
  readonly settingsOpen = signal(false);
  readonly settingsSaving = signal(false);
  readonly draftIds = signal<string[]>([]);
  readonly draftOrder = signal<string[]>([]);
  readonly settingsFilter = signal('');

  private searchTimer: ReturnType<typeof setTimeout> | null = null;
  private searchSeq = 0;

  readonly scopeLabel = computed(() => {
    const settings = this.settings();
    if (!settings || settings.branches.length === 0) return '';
    const visible = settings.branches.filter((branch) => branch.visible).length;
    if (!settings.configured || visible === settings.branches.length) return 'Todas';
    return `${visible} de ${settings.branches.length}`;
  });

  readonly branchGroups = computed((): BranchReportGroup[] => {
    const lines = this.report()?.lines ?? [];
    const groups: BranchReportGroup[] = [];
    const index = new Map<string, BranchReportGroup>();
    for (const line of lines) {
      const current = index.get(line.billing_branch_id);
      if (current) {
        current.lines.push(line);
        current.empty = current.empty && this.isZeroQty(line.quantity);
        continue;
      }
      const group: BranchReportGroup = {
        id: line.billing_branch_id,
        name: line.name,
        city: line.city,
        company: line.razon_social,
        empty: this.isZeroQty(line.quantity),
        lines: [line],
      };
      index.set(line.billing_branch_id, group);
      groups.push(group);
    }
    return groups;
  });

  readonly orderedSettings = computed(() => {
    const settings = this.settings();
    if (!settings) return [];
    const byId = new Map(settings.branches.map((branch) => [branch.id, branch]));
    const order = this.draftOrder();
    const ordered = (order.length ? order : settings.branches.map((branch) => branch.id))
      .map((id) => byId.get(id))
      .filter((branch): branch is BranchReportSettings['branches'][number] => !!branch);
    for (const branch of settings.branches) {
      if (!ordered.some((item) => item.id === branch.id)) ordered.push(branch);
    }
    return ordered;
  });

  readonly filteredSettings = computed(() => {
    const branches = this.orderedSettings();
    const term = this.settingsFilter().trim().toLocaleLowerCase('es');
    if (!term) return branches;
    return branches.filter((branch) => {
      const haystack = [branch.name, branch.city, branch.razon_social]
        .filter(Boolean)
        .join(' ')
        .toLocaleLowerCase('es');
      return haystack.includes(term);
    });
  });

  constructor() {
    this.destroyRef.onDestroy(() => this.clearSearchTimer());
  }

  ngOnInit(): void {
    this.inventoryService.getBranchReportSettings().subscribe({
      next: (settings) => this.settings.set(settings),
      error: (err) => this.toast.error(resolveHttpErrorMessage(err, 'No se pudieron cargar las sucursales')),
    });
    this.applyIncomingSearch();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const root = this.searchRoot()?.nativeElement;
    if (root && !root.contains(event.target as Node)) {
      this.resultsOpen.set(false);
    }
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    this.resultsOpen.set(false);
    if (this.settingsOpen() && !this.settingsSaving()) {
      this.closeSettings();
    }
  }

  onQueryInput(value: string): void {
    this.query.set(value);
    const selected = this.selected();
    if (!value.trim()) {
      this.clearProduct();
      return;
    }
    if (selected && value.trim() === this.productLabel(selected)) {
      this.resultsOpen.set(false);
      return;
    }
    this.scheduleSearch();
  }

  onSearchKeydown(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      const first = this.results()[0];
      if (first && this.resultsOpen()) {
        event.preventDefault();
        this.selectProduct(first);
      }
    }
  }

  selectProduct(product: BranchReportProductHit): void {
    this.selected.set(product);
    this.query.set(this.productLabel(product));
    this.resultsOpen.set(false);
    this.results.set([]);
    this.loadReport(product.id);
  }

  clearProduct(): void {
    this.clearSearchTimer();
    this.query.set('');
    this.results.set([]);
    this.resultsOpen.set(false);
    this.searching.set(false);
    this.selected.set(null);
    this.report.set(null);
    this.reportLoading.set(false);
  }

  openSettings(): void {
    const branches = this.settings()?.branches ?? [];
    this.draftOrder.set(branches.map((branch) => branch.id));
    this.draftIds.set(branches.filter((branch) => branch.visible).map((branch) => branch.id));
    this.settingsFilter.set('');
    this.settingsOpen.set(true);
  }

  closeSettings(): void {
    if (this.settingsSaving()) return;
    this.settingsOpen.set(false);
  }

  isDraftOn(id: string): boolean {
    return this.draftIds().includes(id);
  }

  toggleDraft(id: string): void {
    const current = this.draftIds();
    this.draftIds.set(
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id],
    );
  }

  selectAllBranches(): void {
    this.draftIds.set(this.orderedSettings().map((branch) => branch.id));
  }

  dropBranch(event: CdkDragDrop<unknown>): void {
    const shown = this.filteredSettings();
    const moved = shown[event.previousIndex];
    const target = shown[event.currentIndex];
    if (!moved || !target || moved.id === target.id) return;
    const order = this.orderedSettings().map((branch) => branch.id);
    const fromIndex = order.indexOf(moved.id);
    const toIndex = order.indexOf(target.id);
    if (fromIndex < 0 || toIndex < 0) return;
    moveItemInArray(order, fromIndex, toIndex);
    this.draftOrder.set(order);
  }

  clearDraftBranches(): void {
    this.draftIds.set([]);
  }

  saveSettings(): void {
    const selected = new Set(this.draftIds());
    const order = this.orderedSettings().map((branch) => branch.id);
    const ids = order.filter((id) => selected.has(id));
    if (ids.length === 0 || this.settingsSaving()) return;
    this.settingsSaving.set(true);
    this.inventoryService.saveBranchReportSettings(ids).subscribe({
      next: (settings) => {
        this.settings.set(settings);
        this.settingsSaving.set(false);
        this.settingsOpen.set(false);
        this.toast.success('Sucursales del reporte guardadas');
        const product = this.selected();
        if (product) this.loadReport(product.id);
      },
      error: (err) => {
        this.settingsSaving.set(false);
        this.toast.error(resolveHttpErrorMessage(err, 'No se pudieron guardar las sucursales'));
      },
    });
  }

  isZeroQty(value: string | null | undefined): boolean {
    const amount = Number(value);
    return !Number.isFinite(amount) || amount === 0;
  }

  isBlankMoney(value: string | null | undefined): boolean {
    if (value == null || value === '') return true;
    const amount = Number(value);
    return !Number.isFinite(amount) || amount === 0;
  }

  formatQty(value: string | null | undefined): string {
    if (value == null || value === '') return '—';
    return formatInventoryNumber(value);
  }

  formatMoney(value: string | null | undefined): string {
    if (value == null || value === '') return '—';
    return formatUnitCurrency(value);
  }

  productLabel(product: BranchReportProductHit): string {
    const sku = product.sku?.trim();
    return sku ? `${sku} — ${product.name}` : product.name;
  }

  placeLabel(city: string | null, company: string | null): string {
    return [city, company].map((part) => part?.trim()).filter(Boolean).join(' · ');
  }

  private applyIncomingSearch(): void {
    const fromList = this.listState.searchTerm().trim();
    const fromUrl = (this.route.snapshot.queryParamMap.get('search') ?? '').trim();
    const term = (fromList || fromUrl).slice(0, 80);
    if (!term) return;
    this.query.set(term);
    this.runSearch();
  }

  private scheduleSearch(): void {
    this.clearSearchTimer();
    this.searchTimer = setTimeout(() => {
      this.searchTimer = null;
      this.runSearch();
    }, 280);
  }

  private runSearch(): void {
    const term = this.query().trim();
    if (!term) return;
    const seq = ++this.searchSeq;
    this.searching.set(true);
    this.resultsOpen.set(true);
    this.inventoryService.searchBranchReportProducts(term).subscribe({
      next: (products) => {
        if (seq !== this.searchSeq) return;
        this.results.set(products);
        this.searching.set(false);
      },
      error: (err) => {
        if (seq !== this.searchSeq) return;
        this.searching.set(false);
        this.results.set([]);
        this.toast.error(resolveHttpErrorMessage(err, 'No se pudo buscar el producto'));
      },
    });
  }

  private loadReport(productId: string): void {
    this.reportLoading.set(true);
    this.inventoryService.getBranchStockReport(productId).subscribe({
      next: (report) => {
        if (this.selected()?.id !== productId) return;
        this.report.set(report);
        this.reportLoading.set(false);
      },
      error: (err) => {
        if (this.selected()?.id !== productId) return;
        this.report.set(null);
        this.reportLoading.set(false);
        this.toast.error(resolveHttpErrorMessage(err, 'No se pudo cargar el reporte'));
      },
    });
  }

  private clearSearchTimer(): void {
    if (!this.searchTimer) return;
    clearTimeout(this.searchTimer);
    this.searchTimer = null;
  }
}
