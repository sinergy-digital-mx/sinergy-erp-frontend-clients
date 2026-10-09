import { CommonModule } from '@angular/common';
import { Component, OnInit, signal, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LucideAngularModule, CheckCircle2, Edit2, Power, Radio, Trash2 } from 'lucide-angular';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IDatatableConfig } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { GpsTrackingConfiguration } from '../../models/gps-tracking-configuration.model';
import { GpsTrackingConfigurationService } from '../../services/gps-tracking-configuration.service';
import { GpsTrackingConfigurationModalComponent } from '../../components/gps-tracking-configuration-modal/gps-tracking-configuration-modal.component';

@Component({
  selector: 'app-gps-tracking-configurations-list',
  standalone: true,
  imports: [CommonModule, ButtonComponent, DatatableWrapperComponent, LucideAngularModule],
  templateUrl: './gps-tracking-configurations-list.component.html',
  styleUrl: './gps-tracking-configurations-list.component.scss',
})
export class GpsTrackingConfigurationsListComponent implements OnInit {
  @ViewChild('tableTemplate') tableTemplate!: TemplateRef<unknown>;

  readonly CheckCircle2 = CheckCircle2;
  readonly Edit2 = Edit2;
  readonly Power = Power;
  readonly Radio = Radio;
  readonly Trash2 = Trash2;

  table_config = signal<IDatatableConfig>({
    rows: [],
    columns: [
      { name: 'Nombre', prop: 'name', sortable: true, canAutoResize: true, width: 200 },
      { name: 'Usuario', prop: 'username', sortable: true, canAutoResize: true, width: 180 },
      { name: 'Estado', prop: 'is_active', sortable: true, canAutoResize: true, width: 110 },
      { name: 'Última prueba', prop: 'last_test_result', sortable: false, canAutoResize: true, width: 240 },
      { name: 'Acciones', prop: 'actions', sortable: false, canAutoResize: true, width: 180 },
    ],
    externalPaging: false,
    externalSorting: false,
    page: 1,
    limit: 20,
    totalResults: 0,
    loading: false,
    emptyState: {
      title: 'Sin configuración',
      subtitle: 'Crea la cuenta de 3D Tracking para consultar los camiones',
    },
    columnMode: 'force',
    reorderable: false,
  });

  constructor(
    private gpsConfig: GpsTrackingConfigurationService,
    private dialog: MatDialog,
    private interceptor: InterceptorService
  ) {}

  ngOnInit(): void {
    this.load();
  }

  openCreate(): void {
    this.dialog
      .open(GpsTrackingConfigurationModalComponent, { width: '620px', data: {} })
      .afterClosed()
      .subscribe((saved) => {
        if (saved) this.load();
      });
  }

  edit(configuration: GpsTrackingConfiguration): void {
    this.dialog
      .open(GpsTrackingConfigurationModalComponent, { width: '620px', data: { configuration } })
      .afterClosed()
      .subscribe((saved) => {
        if (saved) this.load();
      });
  }

  activate(configuration: GpsTrackingConfiguration): void {
    if (configuration.is_active) return;
    this.gpsConfig.activate(configuration.id).subscribe({
      next: () => {
        this.interceptor.openSnackbar({
          type: 'success',
          title: 'Listo',
          message: 'Configuración de rastreo activada',
        });
        this.load();
      },
      error: (err) => this.toastError(err, 'No se pudo activar la configuración'),
    });
  }

  test(configuration: GpsTrackingConfiguration): void {
    this.gpsConfig.test({ configuration_id: configuration.id }).subscribe({
      next: (result) => {
        this.interceptor.openSnackbar({
          type: result.ok ? 'success' : 'error',
          title: result.ok ? 'Conexión correcta' : 'Sin conexión',
          message: result.message,
        });
        this.load();
      },
      error: (err) => this.toastError(err, 'No se pudo probar la conexión'),
    });
  }

  remove(configuration: GpsTrackingConfiguration): void {
    if (!confirm(`¿Eliminar la configuración "${configuration.name}"?`)) return;
    this.gpsConfig.remove(configuration.id).subscribe({
      next: () => this.load(),
      error: (err) => this.toastError(err, 'No se pudo eliminar la configuración'),
    });
  }

  statusClass(active: boolean): string {
    return active ? 'settings-badge--status-active' : 'settings-badge--status-inactive';
  }

  lastTest(configuration: GpsTrackingConfiguration): string {
    return configuration.last_test_result?.message || 'Sin prueba';
  }

  private load(): void {
    this.table_config.update((current) => ({ ...current, loading: true }));
    this.gpsConfig.list().subscribe({
      next: (rows) => {
        this.table_config.update((current) => ({
          ...current,
          rows,
          totalResults: rows.length,
          loading: false,
        }));
      },
      error: (err) => {
        this.table_config.update((current) => ({ ...current, loading: false, rows: [] }));
        this.toastError(err, 'No se pudo cargar el rastreo GPS');
      },
    });
  }

  private toastError(err: { error?: { message?: string } }, fallback: string): void {
    this.interceptor.openSnackbar({
      type: 'error',
      title: 'Error',
      message: err?.error?.message || fallback,
    });
  }
}
