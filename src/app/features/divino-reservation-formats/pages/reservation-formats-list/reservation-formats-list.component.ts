import { Component, OnDestroy, signal, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import {
  Download,
  FileText,
  LucideAngularModule,
  Mail,
  Pencil,
  Plus,
  Trash2,
} from 'lucide-angular';
import { DatatableWrapperComponent } from '../../../../core/components/datatable-wrapper/datatable-wrapper.component';
import {
  IDatatableConfig,
  IPaginationEvent,
} from '../../../../core/components/datatable-wrapper/datatable-wrapper.interface';
import { SearchComponent } from '../../../../core/components/search/search.component';
import { AlertDialogComponent } from '../../../../core/components/alert-dialog/alert-dialog.component';
import { HasPermissionDirective } from '../../../../core/directives/has-permission.directive';
import { InterceptorService } from '../../../../core/services/interceptor.service';
import { DivinoReservationFormatService } from '../../services/divino-reservation-format.service';
import {
  DivinoReservationFormat,
  DivinoReservationFormatStatus,
} from '../../models/divino-reservation-format.model';
import { DIVINO_RESERVATION_FORMAT_PERMISSIONS } from '../../config/permissions.config';
import { ReservationFormatModalComponent } from '../../components/reservation-format-modal/reservation-format-modal.component';
import { SendReservationFormatModalComponent } from '../../components/send-reservation-format-modal/send-reservation-format-modal.component';

@Component({
  selector: 'app-reservation-formats-list',
  standalone: true,
  imports: [
    CommonModule,
    DatatableWrapperComponent,
    SearchComponent,
    LucideAngularModule,
    HasPermissionDirective,
  ],
  templateUrl: './reservation-formats-list.component.html',
  styleUrls: ['./reservation-formats-list.component.scss'],
})
export class ReservationFormatsListComponent implements OnDestroy {
  @ViewChild('tableTemplate') tableTemplate: TemplateRef<any>;

  readonly permissions = DIVINO_RESERVATION_FORMAT_PERMISSIONS;
  readonly Plus = Plus;
  readonly FileText = FileText;
  readonly Download = Download;
  readonly Mail = Mail;
  readonly Pencil = Pencil;
  readonly Trash2 = Trash2;
  readonly Math = Math;

  table_config = signal<IDatatableConfig>({
    rows: [],
    columns: [
      { name: 'Folio', prop: 'folio', sortable: false, width: 150 },
      { name: 'Comprador', prop: 'buyer_name', sortable: false, width: 200 },
      { name: 'Lote', prop: 'property', sortable: false, width: 120 },
      { name: 'Estatus', prop: 'status', sortable: false, width: 110 },
      { name: 'Creado por', prop: 'created_by_name', sortable: false, width: 160 },
      { name: 'Fecha', prop: 'created_at', sortable: false, width: 130 },
      { name: '', prop: 'actions', sortable: false, width: 150 },
    ],
    externalPaging: true,
    externalSorting: false,
    page: 1,
    limit: 20,
    totalResults: 0,
    loading: false,
    emptyState: { title: 'Sin formatos', subtitle: 'Aún no se han creado formatos de reservación' },
    columnMode: 'force',
    reorderable: false,
  });

  search = '';
  selectedStatus: DivinoReservationFormatStatus | null = null;
  downloadingId = signal<string | null>(null);

  private destroy$ = new Subject<void>();
  private lastQueryParams = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: DivinoReservationFormatService,
    private dialog: MatDialog,
    private interceptor: InterceptorService,
  ) {
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe((query) => {
      const queryString = JSON.stringify(query);
      if (queryString === this.lastQueryParams) {
        return;
      }
      this.lastQueryParams = queryString;

      this.search = query?.search ?? '';
      this.selectedStatus = query?.status ?? null;
      const page = query?.page ? Number(query.page) : 1;
      const limit = query?.limit ? Number(query.limit) : 20;

      this.table_config.update((c) => ({
        ...c,
        page: isNaN(page) ? 1 : page,
        limit: isNaN(limit) ? 20 : limit,
      }));

      this.load();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  load(): void {
    this.table_config.update((c) => ({ ...c, loading: true }));
    const config = this.table_config();

    this.service
      .list({
        page: config.page,
        limit: config.limit,
        ...(this.search && { search: this.search }),
        ...(this.selectedStatus && { status: this.selectedStatus }),
      })
      .subscribe({
        next: (res) => {
          this.table_config.update((c) => ({
            ...c,
            rows: res?.data ?? [],
            totalResults: res?.total ?? 0,
            hasNext: res?.hasNext ?? false,
            loading: false,
          }));
        },
        error: () => {
          this.table_config.update((c) => ({ ...c, loading: false }));
          this.interceptor.openSnackbar({
            type: 'error',
            title: 'Error',
            message: 'No pudimos cargar los formatos de reservación.',
          });
        },
      });
  }

  onSearchChange(term: string): void {
    this.search = term;
    this.navigate({ page: 1, search: term || undefined });
  }

  onStatusChange(status: DivinoReservationFormatStatus | null): void {
    this.selectedStatus = status;
    this.navigate({ page: 1, status: status || undefined });
  }

  onPageChange(event: IPaginationEvent): void {
    this.navigate({ page: event.page, limit: event.limit });
  }

  private navigate(params: Record<string, unknown>): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        search: this.search || undefined,
        status: this.selectedStatus || undefined,
        ...params,
      },
      queryParamsHandling: 'merge',
    });
  }

  get hasActiveFilters(): boolean {
    return !!(this.search || this.selectedStatus);
  }

  clearFilters(): void {
    this.selectedStatus = null;
    this.search = '';
    this.navigate({ page: 1, search: undefined, status: undefined });
  }

  createFormat(): void {
    this.dialog
      .open(ReservationFormatModalComponent, {
        width: '820px',
        maxWidth: '95vw',
        maxHeight: '90vh',
        panelClass: 'reservation-format-dialog',
        data: { format: null },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.load();
        }
      });
  }

  editFormat(format: DivinoReservationFormat): void {
    this.dialog
      .open(ReservationFormatModalComponent, {
        width: '820px',
        maxWidth: '95vw',
        maxHeight: '90vh',
        panelClass: 'reservation-format-dialog',
        data: { format },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.load();
        }
      });
  }

  sendFormat(format: DivinoReservationFormat): void {
    this.dialog
      .open(SendReservationFormatModalComponent, {
        width: '520px',
        maxWidth: '95vw',
        maxHeight: '90vh',
        panelClass: 'reservation-format-dialog',
        data: { format },
      })
      .afterClosed()
      .subscribe((result) => {
        if (result) {
          this.load();
        }
      });
  }

  downloadPdf(format: DivinoReservationFormat): void {
    if (this.downloadingId()) {
      return;
    }
    this.downloadingId.set(format.id);
    this.service.downloadPdf(format.id).subscribe({
      next: (blob) => {
        this.downloadingId.set(null);
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
        setTimeout(() => URL.revokeObjectURL(url), 60_000);
      },
      error: () => {
        this.downloadingId.set(null);
        this.interceptor.openSnackbar({
          type: 'error',
          title: 'Error',
          message: 'No pudimos generar el PDF.',
        });
      },
    });
  }

  deleteFormat(format: DivinoReservationFormat): void {
    this.dialog
      .open(AlertDialogComponent, {
        width: '400px',
        data: {
          title: 'Eliminar formato',
          message: `¿Estás seguro de que deseas eliminar el formato "${format.folio}"? Esta acción no se puede deshacer.`,
          confirmText: 'Eliminar',
          cancelText: 'Cancelar',
          type: 'danger',
        },
      })
      .afterClosed()
      .subscribe((confirmed) => {
        if (!confirmed) {
          return;
        }
        this.service.delete(format.id).subscribe({
          next: () => {
            this.interceptor.openSnackbar({
              type: 'success',
              title: 'Eliminado',
              message: 'Formato eliminado correctamente.',
            });
            this.load();
          },
          error: () => {
            this.interceptor.openSnackbar({
              type: 'error',
              title: 'Error',
              message: 'No pudimos eliminar el formato.',
            });
          },
        });
      });
  }

  onRowClick(event: any): void {
    const row = event?.data || event;
    this.downloadPdf(row);
  }

  getStatusLabel(status: string): string {
    return status === 'sent' ? 'Enviado' : 'Borrador';
  }

  getStatusPillClass(status: string): string {
    return status === 'sent' ? 'status-pill--sent' : 'status-pill--draft';
  }

  getCreatorName(format: DivinoReservationFormat): string {
    if (format.created_by_name) {
      return format.created_by_name;
    }
    const creator = format.creator;
    if (creator?.first_name || creator?.last_name) {
      return `${creator.first_name ?? ''} ${creator.last_name ?? ''}`.trim();
    }
    return '—';
  }
}
