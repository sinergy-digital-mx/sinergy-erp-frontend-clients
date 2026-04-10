import { Component, OnInit, signal, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FiscalConfigurationService } from '../../services/fiscal-configuration.service';
import { FiscalConfiguration } from '../../models/fiscal-configuration.model';
import { FiscalConfigurationModalComponent } from '../fiscal-configuration-modal/fiscal-configuration-modal.component';
import { CustomSnackbarComponent } from '../../../../core/components/custom-snackbar/custom-snackbar.component';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import { IDatatableConfig, IPaginationEvent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-fiscal-configuration-list',
  standalone: true,
  imports: [CommonModule, ButtonComponent, LucideAngularModule, DatatableWrapperComponent],
  templateUrl: './fiscal-configuration-list.component.html',
  styleUrl: './fiscal-configuration-list.component.scss'
})
export class FiscalConfigurationListComponent implements OnInit {
  @ViewChild('tableTemplate') tableTemplate: TemplateRef<any>;

  table_config = signal<IDatatableConfig>({
    rows: [],
    columns: [
      { name: 'Razón Social', prop: 'razon_social', sortable: true, canAutoResize: true, width: 200 },
      { name: 'RFC', prop: 'rfc', sortable: false, canAutoResize: true, width: 120 },
      { name: 'Tipo de Persona', prop: 'persona_type', sortable: true, canAutoResize: true, width: 150 },
      { name: 'Status', prop: 'status', sortable: true, canAutoResize: true, width: 100 },
    ],
    externalPaging: true,
    externalSorting: false,
    page: 1,
    limit: 20,
    totalResults: 0,
    loading: false,
    emptyState: { title: 'Sin resultados', subtitle: 'No se encontraron configuraciones fiscales' },
    columnMode: 'force',
    reorderable: false,
  });

  constructor(
    private fiscalConfigService: FiscalConfigurationService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadFiscalConfigurations();
  }

  loadFiscalConfigurations(): void {
    this.table_config.update(c => ({ ...c, loading: true }));
    
    this.fiscalConfigService.listFiscalConfigurations({
      page: this.table_config().page,
      limit: this.table_config().limit
    }).subscribe({
      next: (response) => {
        this.table_config.update(c => ({
          ...c,
          rows: response.data,
          totalResults: response.total,
          loading: false,
          hasNext: response.data.length === c.limit
        }));
      },
      error: () => {
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: 'Error al cargar configuraciones fiscales', type: 'error' },
          duration: 3000
        });
        this.table_config.update(c => ({ ...c, loading: false }));
      }
    });
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
      width: '800px',
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
      width: '800px',
      data: { fiscalConfig: config }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadFiscalConfigurations();
      }
    });
  }

  getStatusClass(status: string): string {
    return status === 'active' 
      ? 'bg-green-100 text-green-800' 
      : 'bg-red-100 text-red-800';
  }

  getStatusLabel(status: string): string {
    return status === 'active' ? 'Activo' : 'Inactivo';
  }
}
