import { Component, OnInit, TemplateRef, ViewChild, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { EmailTemplateService } from '../../services/email-template.service';
import { EmailTemplate } from '../../models/email-template.model';
import { EmailTemplateCreateModalComponent } from '../../components/email-template-create-modal/email-template-create-modal.component';
import { SearchComponent } from '../../../../core/components/search/search.component';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IDatatableConfig, IPaginationEvent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { Edit2, Trash2 } from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-email-templates-list',
  standalone: true,
  imports: [
    CommonModule,
    SearchComponent,
    ButtonComponent,
    DatatableWrapperComponent,
    LucideAngularModule
  ],
  templateUrl: './email-templates-list.component.html',
  styleUrl: './email-templates-list.component.scss'
})
export class EmailTemplatesListComponent implements OnInit, OnDestroy {
  @ViewChild('tableTemplate') tableTemplate: TemplateRef<any>;

  templates: EmailTemplate[] = [];
  loading = false;
  search = '';
  isActiveFilter: boolean | undefined = undefined;
  hasPaginated = false;
  private destroy$ = new Subject<void>();

  table_config = signal<IDatatableConfig>({
    rows: [],
    columns: [
      { name: 'Nombre', prop: 'name', sortable: true, canAutoResize: true, width: 150 },
      { name: 'Asunto', prop: 'subject', sortable: true, canAutoResize: true, width: 250 },
      { name: 'Estado', prop: 'is_active', sortable: true, canAutoResize: true, width: 100 },
      { name: 'Creado', prop: 'created_at', sortable: true, canAutoResize: true, width: 150 },
      { name: 'Acciones', prop: 'actions', sortable: false, canAutoResize: true, width: 120 },
    ],
    externalPaging: true,
    externalSorting: false,
    page: 1,
    limit: 10,
    totalResults: 0,
    loading: false,
    emptyState: { title: 'Sin resultados', subtitle: 'No se encontraron templates de correo' },
    columnMode: 'force',
    reorderable: false,
  });

  readonly Edit2 = Edit2;
  readonly Trash2 = Trash2;

  constructor(
    private emailTemplateService: EmailTemplateService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadTemplates();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadTemplates() {
    this.loading = true;
    this.updateTableConfig({ loading: true });
    const params = this.buildQueryParams();

    this.emailTemplateService.getEmailTemplates(params).subscribe({
      next: (res) => {
        const templates = res?.data ?? [];
        this.templates = templates;
        this.updateTableConfig({
          rows: templates,
          totalResults: res?.total ?? templates.length,
          page: res?.page ?? this.table_config().page,
          limit: res?.limit ?? this.table_config().limit,
          hasNext: (res?.page ?? 1) < (res?.totalPages ?? 1),
          loading: false
        });
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading templates:', err);
        this.loading = false;
        this.updateTableConfig({ loading: false });
      }
    });
  }

  onSearchChange(searchTerm: string) {
    this.search = searchTerm;
    this.updateTableConfig({ page: 1 });
    this.hasPaginated = true;
    this.loadTemplates();
  }

  onStatusFilterChange(value: string) {
    this.isActiveFilter = value === '' ? undefined : value === 'true';
    this.updateTableConfig({ page: 1 });
    this.hasPaginated = true;
    this.loadTemplates();
  }

  onPageChange(event: IPaginationEvent) {
    this.updateTableConfig({
      page: event.page,
      limit: event.limit
    });
    this.hasPaginated = true;
    this.loadTemplates();
  }

  openCreateModal() {
    const dialogRef = this.dialog.open(EmailTemplateCreateModalComponent, {
      width: '900px',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTemplates();
      }
    });
  }

  editTemplate(template: EmailTemplate) {
    const dialogRef = this.dialog.open(EmailTemplateCreateModalComponent, {
      width: '900px',
      disableClose: false,
      data: { template }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadTemplates();
      }
    });
  }

  deleteTemplate(template: EmailTemplate) {
    if (!confirm(`¿Eliminar el template "${template.name}"?`)) return;

    this.emailTemplateService.deleteEmailTemplate(template.id).subscribe({
      next: () => {
        this.loadTemplates();
      },
      error: (err) => {
        console.error('Error deleting template:', err);
      }
    });
  }

  getStatusClass(isActive: boolean): string {
    return isActive ? 'settings-badge--status-active' : 'settings-badge--status-inactive';
  }

  getStatusLabel(isActive: boolean): string {
    return isActive ? 'Activo' : 'Inactivo';
  }

  private buildQueryParams() {
    const hasSearch = Boolean(this.search?.trim());
    const hasStatusFilter = this.isActiveFilter !== undefined;

    if (!this.hasPaginated && !hasSearch && !hasStatusFilter) {
      return undefined;
    }

    return {
      page: this.table_config().page,
      limit: this.table_config().limit,
      ...(hasSearch && { search: this.search.trim() }),
      ...(hasStatusFilter && { isActive: this.isActiveFilter })
    };
  }

  private updateTableConfig(config: Partial<IDatatableConfig>) {
    this.table_config.update(current => ({
      ...current,
      ...config
    }));
  }
}
