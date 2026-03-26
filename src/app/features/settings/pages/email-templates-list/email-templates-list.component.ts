import { Component, OnInit, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { EmailTemplateService } from '../../services/email-template.service';
import { EmailTemplate } from '../../models/email-template.model';
import { EmailTemplateCreateModalComponent } from '../../components/email-template-create-modal/email-template-create-modal.component';
import { SearchComponent } from '../../../../core/components/search/search.component';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IDatatableConfig } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
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
  private destroy$ = new Subject<void>();

  table_config: IDatatableConfig = {
    rows: [],
    columns: [
      { name: 'Nombre', prop: 'name', sortable: true, canAutoResize: true, width: 150 },
      { name: 'Asunto', prop: 'subject', sortable: true, canAutoResize: true, width: 250 },
      { name: 'Descripción', prop: 'description', sortable: false, canAutoResize: true, width: 200 },
      { name: 'Estado', prop: 'is_active', sortable: true, canAutoResize: true, width: 100 },
      { name: 'Creado', prop: 'created_at', sortable: true, canAutoResize: true, width: 150 },
      { name: 'Acciones', prop: 'actions', sortable: false, canAutoResize: true, width: 120 },
    ],
    externalPaging: false,
    externalSorting: false,
    page: 1,
    limit: 20,
    totalResults: 0,
    loading: false,
    emptyState: { title: 'Sin resultados', subtitle: 'No se encontraron templates de correo' },
    columnMode: 'force',
    reorderable: false,
  };

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
    const params = this.search ? { search: this.search } : {};

    this.emailTemplateService.getEmailTemplates(params).subscribe({
      next: (res: any) => {
        let templates = [];
        if (Array.isArray(res)) {
          templates = res;
        } else if (res?.data) {
          templates = res.data;
        }
        this.templates = templates;
        this.table_config.rows = templates;
        this.table_config.totalResults = templates.length;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading templates:', err);
        this.loading = false;
      }
    });
  }

  onSearchChange(searchTerm: string) {
    this.search = searchTerm;
    this.loadTemplates();
  }

  openCreateModal() {
    const dialogRef = this.dialog.open(EmailTemplateCreateModalComponent, {
      width: '800px',
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
      width: '800px',
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
    return isActive
      ? 'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800'
      : 'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800';
  }

  getStatusLabel(isActive: boolean): string {
    return isActive ? 'Activo' : 'Inactivo';
  }
}
