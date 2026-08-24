import { Component, OnInit, computed, effect, inject, signal, untracked } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LucideAngularModule, ArrowRightLeft } from 'lucide-angular';
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
import { resolveHttpErrorMessage } from '../../../../core/utils/http-error-message.util';

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
  readonly state = inject(InventoryListState);

  readonly ArrowRightLeft = ArrowRightLeft;

  locations = signal<InventoryLocationFiscal[]>([]);
  stats = signal<InventoryStats | null>(null);
  statsLoading = signal(true);
  statsFailed = signal(false);

  selectedFiscal = computed(() =>
    this.locations().find((fiscal) => fiscal.id === this.state.selectedFiscalId()) ?? null
  );

  branchOptions = computed(() => this.selectedFiscal()?.branches ?? []);

  warehouseOptions = computed(() =>
    this.branchOptions().find((branch) => branch.id === this.state.selectedBranchId())?.warehouses ?? []
  );

  constructor() {
    effect(() => {
      const epoch = this.state.statsEpoch();
      if (epoch === 0) return;
      untracked(() => this.loadStats());
    });
  }

  ngOnInit(): void {
    this.loadLocations();
  }

  onSearch(): void {
    this.state.reloadList();
  }

  onFiscalChange(id: string): void {
    this.state.selectedFiscalId.set(id || '');
    this.state.selectedBranchId.set('');
    this.state.selectedWarehouseId.set('');
    this.reloadLocationScope();
  }

  onBranchChange(id: string): void {
    this.state.selectedBranchId.set(id || '');
    this.state.selectedWarehouseId.set('');
    this.reloadLocationScope();
  }

  onWarehouseChange(id: string): void {
    this.state.selectedWarehouseId.set(id || '');
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
    this.state.searchTerm.set('');
    this.state.selectedFiscalId.set('');
    this.state.selectedBranchId.set('');
    this.state.selectedWarehouseId.set('');
    this.reloadLocationScope();
  }

  fiscalOptionLabel(fiscal: InventoryLocationFiscal): string {
    const name = fiscal.razon_social?.trim() || 'Sin razón social';
    const rfc = fiscal.rfc?.trim();
    return rfc ? `${name} (${rfc})` : name;
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

  private reloadLocationScope(): void {
    this.loadStats();
    this.state.reloadList();
  }

  private loadLocations(): void {
    this.inventoryService.getLocations().subscribe({
      next: (locations) => {
        this.locations.set(locations);
        const first = locations[0];
        if (first && !this.state.selectedFiscalId()) {
          this.state.selectedFiscalId.set(first.id);
        }
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
