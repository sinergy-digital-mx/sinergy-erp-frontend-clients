import { Component, DestroyRef, OnInit, computed, effect, inject, signal, untracked } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { LucideAngularModule, ArrowRightLeft, ClipboardCheck, ChartColumn } from 'lucide-angular';
import { InventoryService } from '../../services/inventory.service';
import { InventoryListState } from '../../services/inventory-list-state.service';
import { InventoryLocationFiscal } from '../../models/inventory-location.model';
import { InventoryStats } from '../../models/inventory-stats.model';
import { InventoryStatsCardsComponent } from '../inventory-stats-cards/inventory-stats-cards.component';
import { FilterClearButtonComponent } from '../../../../core/components/filter-clear-button/filter-clear-button.component';
import {
  InventoryExportDialogComponent,
  InventoryExportDialogResult,
} from '../inventory-export-dialog/inventory-export-dialog.component';
import { ToastService } from '../../../../core/services/toast.service';
import { AuthService } from '../../../../core/services/auth.service';
import { resolveHttpErrorMessage } from '../../../../core/utils/http-error-message.util';
import { INVENTORY_PERMISSIONS } from '../../config/permissions.config';
import {
  INVENTORY_ALL_FISCAL,
  inventoryFiscalFromQuery,
  replaceInventoryQuery,
} from '../../utils/inventory-list.util';

@Component({
  selector: 'app-inventory-batch-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    LucideAngularModule,
    FilterClearButtonComponent,
    InventoryStatsCardsComponent,
  ],
  providers: [InventoryListState],
  templateUrl: './inventory-batch-list.component.html',
  styleUrl: './inventory-batch-list.component.scss',
})
export class InventoryBatchListComponent implements OnInit {
  private readonly inventoryService = inject(InventoryService);
  private readonly dialog = inject(MatDialog);
  private readonly toast = inject(ToastService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private fiscalChoice: string | 'all' | null = null;
  private readonly auth = inject(AuthService);
  private readonly destroyRef = inject(DestroyRef);
  readonly state = inject(InventoryListState);
  readonly canViewStats = signal(this.auth.hasPermission(INVENTORY_PERMISSIONS.viewStats));
  readonly branchReport = signal(this.isBranchReportUrl(this.router.url));

  readonly ArrowRightLeft = ArrowRightLeft;
  readonly ClipboardCheck = ClipboardCheck;
  readonly ChartColumn = ChartColumn;

  private searchTimer: ReturnType<typeof setTimeout> | null = null;

  locations = signal<InventoryLocationFiscal[]>([]);
  stats = signal<InventoryStats | null>(null);
  statsLoading = signal(this.canViewStats());
  statsFailed = signal(false);

  selectedFiscal = computed(() =>
    this.locations().find((fiscal) => fiscal.id === this.state.selectedFiscalId()) ?? null
  );

  branchOptions = computed(() => this.selectedFiscal()?.branches ?? []);

  warehouseOptions = computed(() =>
    this.branchOptions().find((branch) => branch.id === this.state.selectedBranchId())?.warehouses ?? []
  );

  constructor() {
    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe((event) => this.branchReport.set(this.isBranchReportUrl(event.urlAfterRedirects)));

    effect(() => {
      const epoch = this.state.statsEpoch();
      if (epoch === 0) return;
      untracked(() => this.loadStats());
    });
  }

  ngOnInit(): void {
    this.readFiltersFromUrl();
    let known = false;
    this.auth.permissions$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      const allowed = this.auth.hasPermission(INVENTORY_PERMISSIONS.viewStats);
      const changed = known && allowed !== this.canViewStats();
      known = true;
      this.canViewStats.set(allowed);
      if (!allowed) {
        this.stats.set(null);
        this.statsLoading.set(false);
        this.statsFailed.set(false);
        return;
      }
      if (changed) this.loadStats();
    });
    this.loadLocations();
    this.destroyRef.onDestroy(() => this.clearSearchTimer());
  }

  onSearchInput(value: string): void {
    this.state.searchTerm.set(value);
    this.writeFilters();
    this.clearSearchTimer();
    this.searchTimer = setTimeout(() => {
      this.searchTimer = null;
      this.state.reloadList();
    }, 300);
  }

  onSearch(): void {
    this.clearSearchTimer();
    this.writeFilters();
    this.state.reloadList();
  }

  onFiscalChange(id: string): void {
    this.fiscalChoice = id ? id : 'all';
    this.state.selectedFiscalId.set(id || '');
    this.state.selectedBranchId.set('');
    this.state.selectedWarehouseId.set('');
    this.writeFilters();
    this.reloadLocationScope();
  }

  onBranchChange(id: string): void {
    this.state.selectedBranchId.set(id || '');
    this.state.selectedWarehouseId.set('');
    this.writeFilters();
    this.reloadLocationScope();
  }

  onWarehouseChange(id: string): void {
    this.state.selectedWarehouseId.set(id || '');
    this.writeFilters();
    this.reloadLocationScope();
  }

  get hasActiveFilters(): boolean {
    return !!(
      this.state.searchTerm() ||
      this.state.selectedFiscalId() ||
      this.state.selectedBranchId() ||
      this.state.selectedWarehouseId()
    );
  }

  clearFilters(): void {
    this.clearSearchTimer();
    this.fiscalChoice = 'all';
    this.state.searchTerm.set('');
    this.state.selectedFiscalId.set('');
    this.state.selectedBranchId.set('');
    this.state.selectedWarehouseId.set('');
    this.writeFilters();
    this.reloadLocationScope();
  }

  fiscalOptionLabel(fiscal: InventoryLocationFiscal): string {
    const name = fiscal.razon_social?.trim() || 'Sin razón social';
    const rfc = fiscal.rfc?.trim();
    return rfc ? `${name} (${rfc})` : name;
  }

  private isBranchReportUrl(url: string): boolean {
    return url.split('?')[0].endsWith('/sucursal');
  }

  openExportModal(): void {
    const isSummary = this.router.url.split('?')[0].endsWith('/totalizado');
    const defaultType = isSummary ? 'summary' : 'batches';

    this.dialog
      .open(InventoryExportDialogComponent, {
        width: '440px',
        maxWidth: '95vw',
        autoFocus: false,
        data: {
          defaultType,
          search: this.state.searchTerm() || undefined,
          ...this.state.locationFilters(),
          only_available: defaultType === 'summary' ? true : undefined,
        },
      })
      .afterClosed()
      .subscribe((result: InventoryExportDialogResult | undefined) => {
        if (result?.downloaded) {
          this.toast.success('Reporte descargado');
        }
      });
  }

  private clearSearchTimer(): void {
    if (!this.searchTimer) return;
    clearTimeout(this.searchTimer);
    this.searchTimer = null;
  }

  private reloadLocationScope(): void {
    this.loadStats();
    this.state.reloadList();
  }

  private readFiltersFromUrl(): void {
    const params = this.route.snapshot.queryParamMap;
    const search = params.get('search') ?? '';
    if (search) this.state.searchTerm.set(search);
    this.fiscalChoice = inventoryFiscalFromQuery(params.get('fiscal_configuration_id'));
    if (typeof this.fiscalChoice === 'string' && this.fiscalChoice !== 'all') {
      this.state.selectedFiscalId.set(this.fiscalChoice);
    }
    const branch = params.get('billing_branch_id') ?? '';
    const warehouse = params.get('warehouse_id') ?? '';
    if (branch) this.state.selectedBranchId.set(branch);
    if (warehouse) this.state.selectedWarehouseId.set(warehouse);
  }

  private applyLocationFromCatalog(locations: InventoryLocationFiscal[]): void {
    const explicitAll = this.fiscalChoice === 'all';
    const fiscal = locations.find((item) => item.id === this.state.selectedFiscalId());
    if (!fiscal) {
      if (!explicitAll && locations[0]) {
        this.state.selectedFiscalId.set(locations[0].id);
        this.fiscalChoice = locations[0].id;
      } else {
        this.state.selectedFiscalId.set('');
        this.state.selectedBranchId.set('');
        this.state.selectedWarehouseId.set('');
      }
      return;
    }
    const branch = fiscal.branches.find((item) => item.id === this.state.selectedBranchId());
    if (!branch) {
      this.state.selectedBranchId.set('');
      this.state.selectedWarehouseId.set('');
      return;
    }
    if (!branch.warehouses.some((item) => item.id === this.state.selectedWarehouseId())) {
      this.state.selectedWarehouseId.set('');
    }
  }

  private writeFilters(): void {
    const fiscalId = this.state.selectedFiscalId();
    const fiscal =
      fiscalId || this.fiscalChoice === 'all' ? fiscalId || INVENTORY_ALL_FISCAL : null;
    replaceInventoryQuery(this.router, this.route, {
      search: this.state.searchTerm().trim() || null,
      fiscal_configuration_id: fiscal,
      billing_branch_id: this.state.selectedBranchId() || null,
      warehouse_id: this.state.selectedWarehouseId() || null,
    });
  }

  private loadLocations(): void {
    this.inventoryService.getLocations().subscribe({
      next: (locations) => {
        this.locations.set(locations);
        this.applyLocationFromCatalog(locations);
        this.writeFilters();
        this.state.locationsReady.set(true);
        this.loadStats();
      },
      error: (err) => {
        this.state.locationsReady.set(true);
        this.loadStats();
        this.toast.error(resolveHttpErrorMessage(err, 'No se pudo cargar el catálogo de ubicaciones'));
      },
    });
  }

  private loadStats(): void {
    if (!this.canViewStats()) {
      this.stats.set(null);
      this.statsLoading.set(false);
      this.statsFailed.set(false);
      return;
    }
    this.statsLoading.set(true);
    this.statsFailed.set(false);

    this.inventoryService.getStats(this.state.locationFilters()).subscribe({
      next: (stats) => {
        this.stats.set(stats);
        this.statsLoading.set(false);
      },
      error: (err) => {
        this.stats.set(null);
        this.statsFailed.set(true);
        this.statsLoading.set(false);
        this.toast.error(resolveHttpErrorMessage(err, 'No se pudieron cargar las estadísticas de inventario'));
      },
    });
  }
}
