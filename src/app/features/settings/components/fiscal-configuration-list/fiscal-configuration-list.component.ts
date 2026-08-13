import { Component, OnInit, signal, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, forkJoin, of } from 'rxjs';
import { FiscalConfigurationService } from '../../services/fiscal-configuration.service';
import { BranchService } from '../../services/branch.service';
import { FiscalConfiguration } from '../../models/fiscal-configuration.model';
import { FiscalConfigurationModalComponent } from '../fiscal-configuration-modal/fiscal-configuration-modal.component';
import { FinkokIntegrationPanelComponent } from '../finkok-integration-panel/finkok-integration-panel.component';
import { CustomSnackbarComponent } from '../../../../core/components/custom-snackbar/custom-snackbar.component';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IDatatableConfig, IPaginationEvent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { TabComponent, TabItem } from '../../../../core/components/tab/tab.component';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-fiscal-configuration-list',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    LucideAngularModule,
    DatatableWrapperComponent,
    TabComponent,
    FinkokIntegrationPanelComponent,
  ],
  templateUrl: './fiscal-configuration-list.component.html',
  styleUrl: './fiscal-configuration-list.component.scss'
})
export class FiscalConfigurationListComponent implements OnInit {
  @ViewChild('tableTemplate') tableTemplate: TemplateRef<any>;

  readonly tabs: TabItem[] = [
    { id: 'razones-sociales', title: 'Razones Sociales' },
    { id: 'finkok', title: 'Integración Finkok' },
  ];

  activeTab = 'razones-sociales';

  table_config = signal<IDatatableConfig>({
    rows: [],
    columns: [
      { name: 'Razón Social', prop: 'razon_social', sortable: true, canAutoResize: true, width: 200 },
      { name: 'RFC', prop: 'rfc', sortable: false, canAutoResize: true, width: 120 },
      { name: 'Prefijo', prop: 'prefix', sortable: false, canAutoResize: true, width: 90 },
      { name: 'Sucursales', prop: 'branches_count', sortable: false, canAutoResize: true, width: 110 },
      { name: 'Status', prop: 'status', sortable: true, canAutoResize: true, width: 100 },
    ],
    externalPaging: true,
    externalSorting: false,
    page: 1,
    limit: 20,
    totalResults: 0,
    loading: false,
    emptyState: { title: 'Sin resultados', subtitle: 'No se encontraron razones sociales' },
    columnMode: 'force',
    reorderable: false,
  });

  constructor(
    private fiscalConfigService: FiscalConfigurationService,
    private branchService: BranchService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const tab = this.route.snapshot.queryParamMap.get('tab');
    if (tab === 'finkok') {
      this.activeTab = 'finkok';
    }

    this.route.queryParamMap.subscribe((params) => {
      const nextTab = params.get('tab');
      if (nextTab === 'finkok') {
        this.activeTab = 'finkok';
      } else if (nextTab === 'razones-sociales') {
        this.activeTab = 'razones-sociales';
      }
    });

    this.loadFiscalConfigurations();
  }

  onTabChange(tabId: string): void {
    this.activeTab = tabId;
    void this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { tab: tabId === 'razones-sociales' ? null : tabId },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
  }

  loadFiscalConfigurations(): void {
    this.table_config.update(c => ({ ...c, loading: true }));

    forkJoin({
      response: this.fiscalConfigService.listFiscalConfigurations({
        page: this.table_config().page,
        limit: this.table_config().limit
      }),
      branches: this.branchService.getAllBranches().pipe(catchError(() => of([]))),
    }).subscribe({
      next: ({ response, branches }) => {
        const counts = new Map<string, number>();
        for (const branch of branches) {
          const fiscalId =
            branch.fiscal_configuration_id ||
            (branch as { fiscal_configuration?: { id?: string } }).fiscal_configuration?.id;
          if (!fiscalId) continue;
          counts.set(fiscalId, (counts.get(fiscalId) ?? 0) + 1);
        }

        const rows = (response.data ?? []).map((item) => ({
          ...item,
          branches_count: this.resolveBranchCount(item, counts.get(item.id) ?? 0),
        }));

        this.table_config.update(c => ({
          ...c,
          rows,
          totalResults: response.total,
          loading: false,
          hasNext: rows.length === c.limit
        }));
      },
      error: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: 'Error al cargar razones sociales', type: 'error' },
          duration: 3000
        });
        this.table_config.update(c => ({ ...c, loading: false }));
      }
    });
  }

  getBranchCount(item: FiscalConfiguration): number {
    return this.resolveBranchCount(item, 0);
  }

  private resolveBranchCount(item: FiscalConfiguration, fallback: number): number {
    if (item.branches_count != null) return Number(item.branches_count) || 0;
    if (item.branch_count != null) return Number(item.branch_count) || 0;
    if (Array.isArray(item.branches)) return item.branches.length;
    return fallback;
  }

  onPageChange(event: IPaginationEvent): void {
    this.table_config.update(c => ({
      ...c,
      page: event.page,
      limit: event.limit
    }));
    this.loadFiscalConfigurations();
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(FiscalConfigurationModalComponent, {
      width: '92vw',
      maxWidth: '760px',
      data: { fiscalConfig: null }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.table_config.update(c => ({ ...c, page: 1 }));
        this.loadFiscalConfigurations();
      }
    });
  }

  openEditDialog(config: FiscalConfiguration): void {
    const dialogRef = this.dialog.open(FiscalConfigurationModalComponent, {
      width: '92vw',
      maxWidth: '760px',
      data: { fiscalConfig: config }
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadFiscalConfigurations();
    });
  }

  getStatusClass(status: string): string {
    return status === 'active'
      ? 'settings-badge--status-active'
      : 'settings-badge--status-inactive';
  }

  getStatusLabel(status: string): string {
    return status === 'active' ? 'Activo' : 'Inactivo';
  }
}
