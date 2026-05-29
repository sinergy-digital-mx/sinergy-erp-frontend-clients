import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit, signal, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IDatatableConfig } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { MailerConfiguration } from '../../models/mailer-configuration.model';
import { MailerConfigurationService } from '../../services/mailer-configuration.service';
import { MailerConfigurationModalComponent } from '../../components/mailer-configuration-modal/mailer-configuration-modal.component';
import { CheckCircle2, Edit2, Power, Trash2 } from 'lucide-angular';
import { LucideAngularModule } from 'lucide-angular';
import { InterceptorService } from '../../../../core/services/interceptor.service';

@Component({
  selector: 'app-mailer-configurations-list',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    DatatableWrapperComponent,
    LucideAngularModule
  ],
  templateUrl: './mailer-configurations-list.component.html',
  styleUrl: './mailer-configurations-list.component.scss'
})
export class MailerConfigurationsListComponent implements OnInit, OnDestroy {
  @ViewChild('tableTemplate') tableTemplate: TemplateRef<any>;

  configurations: MailerConfiguration[] = [];
  private destroy$ = new Subject<void>();

  table_config = signal<IDatatableConfig>({
    rows: [],
    columns: [
      { name: 'Nombre', prop: 'name', sortable: true, canAutoResize: true, width: 200 },
      { name: 'Proveedor', prop: 'vendor', sortable: true, canAutoResize: true, width: 120 },
      { name: 'Estado', prop: 'is_active', sortable: true, canAutoResize: true, width: 100 },
      { name: 'Creado', prop: 'created_at', sortable: true, canAutoResize: true, width: 150 },
      { name: 'Acciones', prop: 'actions', sortable: false, canAutoResize: true, width: 160 },
    ],
    externalPaging: false,
    externalSorting: false,
    page: 1,
    limit: 20,
    totalResults: 0,
    loading: false,
    emptyState: { title: 'Sin resultados', subtitle: 'No se encontraron configuraciones de correo' },
    columnMode: 'force',
    reorderable: false,
  });

  readonly CheckCircle2 = CheckCircle2;
  readonly Edit2 = Edit2;
  readonly Power = Power;
  readonly Trash2 = Trash2;

  constructor(
    private mailerConfigurationService: MailerConfigurationService,
    private dialog: MatDialog,
    private interceptorService: InterceptorService
  ) {}

  ngOnInit() {
    this.loadConfigurations();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadConfigurations() {
    this.updateTableConfig({ loading: true });

    this.mailerConfigurationService.getMailerConfigurations().subscribe({
      next: (res) => {
        const configurations = (Array.isArray(res) ? res : res?.data ?? [])
          .map(configuration => this.normalizeConfiguration(configuration));
        this.configurations = configurations;
        this.updateTableConfig({
          rows: configurations,
          totalResults: Array.isArray(res) ? configurations.length : res?.total ?? configurations.length,
          loading: false
        });
      },
      error: (err) => {
        console.error('Error loading mailer configurations:', err);
        this.updateTableConfig({ loading: false });
      }
    });
  }

  openCreateModal() {
    const dialogRef = this.dialog.open(MailerConfigurationModalComponent, {
      width: '620px',
      disableClose: false
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadConfigurations();
      }
    });
  }

  editConfiguration(configuration: MailerConfiguration) {
    const dialogRef = this.dialog.open(MailerConfigurationModalComponent, {
      width: '620px',
      disableClose: false,
      data: { configuration }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadConfigurations();
      }
    });
  }

  activateConfiguration(configuration: MailerConfiguration) {
    if (this.isConfigurationActive(configuration)) {
      return;
    }

    this.updateTableConfig({ loading: true });
    this.mailerConfigurationService.activateMailerConfiguration(configuration.id).subscribe({
      next: () => {
        this.interceptorService.openSnackbar({
          type: 'success',
          title: 'Éxito',
          message: 'Configuración activada correctamente'
        });
        this.loadConfigurations();
      },
      error: (err) => {
        this.updateTableConfig({ loading: false });
        this.interceptorService.openSnackbar({
          type: 'error',
          title: 'Error',
          message: err.error?.message || 'Error al activar configuración'
        });
      }
    });
  }

  deleteConfiguration(configuration: MailerConfiguration) {
    if (!confirm(`¿Eliminar la configuración "${configuration.name}"?`)) return;

    this.mailerConfigurationService.deleteMailerConfiguration(configuration.id).subscribe({
      next: () => {
        this.loadConfigurations();
      },
      error: (err) => {
        console.error('Error deleting mailer configuration:', err);
      }
    });
  }

  getStatusClass(isActive: boolean): string {
    return isActive ? 'settings-badge--status-active' : 'settings-badge--status-inactive';
  }

  getStatusLabel(isActive: boolean): string {
    return isActive ? 'Activa' : 'Inactiva';
  }

  isConfigurationActive(configuration: MailerConfiguration): boolean {
    return Boolean(configuration.is_active ?? configuration.isActive);
  }

  private normalizeConfiguration(configuration: MailerConfiguration): MailerConfiguration {
    return {
      ...configuration,
      is_active: this.isConfigurationActive(configuration)
    };
  }

  private updateTableConfig(config: Partial<IDatatableConfig>) {
    this.table_config.update(current => ({
      ...current,
      ...config
    }));
  }
}
