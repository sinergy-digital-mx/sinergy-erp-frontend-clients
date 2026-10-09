import { Component, OnDestroy, OnInit, ViewChild, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { CustomSnackbarComponent } from '../../../../core/components/custom-snackbar/custom-snackbar.component';
import { SpinnerComponent } from '../../../../core/components/spinner/spinner.component';
import { HasPermissionDirective } from '../../../../core/directives/has-permission.directive';
import { CreateShippingDialogComponent } from '../../components/create-shipping-dialog/create-shipping-dialog.component';
import { ShippingDetailDialogComponent } from '../../components/shipping-detail-dialog/shipping-detail-dialog.component';
import { TripCardComponent } from '../../components/trip-card/trip-card.component';
import { SHIPPING_PERMISSIONS } from '../../config/permissions.config';
import { ShippingListItem } from '../../models/shipping.model';
import { ShippingService } from '../../services/shipping.service';
import { ShippingsCalendarComponent } from '../shippings-calendar/shippings-calendar.component';

type TripsView = 'calendar' | 'list';

@Component({
  selector: 'app-trips-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HasPermissionDirective,
    SpinnerComponent,
    TripCardComponent,
    ShippingsCalendarComponent,
  ],
  templateUrl: './trips-list.component.html',
  styleUrl: './trips-list.component.scss',
})
export class TripsListComponent implements OnInit, OnDestroy {
  readonly permissions = SHIPPING_PERMISSIONS;

  @ViewChild(ShippingsCalendarComponent) calendar?: ShippingsCalendarComponent;

  view = signal<TripsView>('calendar');
  status = signal('');
  rows = signal<ShippingListItem[]>([]);
  page = signal(1);
  limit = signal(20);
  total = signal(0);
  loading = signal(false);

  private destroy$ = new Subject<void>();

  constructor(
    private shippingService: ShippingService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const nextView: TripsView = params['view'] === 'list' ? 'list' : 'calendar';
      this.view.set(nextView);
      this.status.set(params['status'] || '');
      const page = Number(params['page']) || 1;
      const limit = Number(params['limit']) || 20;
      this.page.set(page > 0 ? page : 1);
      this.limit.set(limit > 0 ? limit : 20);
      if (nextView === 'list') this.load();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  setView(mode: TripsView): void {
    if (this.view() === mode) return;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { view: mode === 'list' ? 'list' : null },
      queryParamsHandling: 'merge',
    });
  }

  onStatusChange(value: string): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { status: value || null, page: 1 },
      queryParamsHandling: 'merge',
    });
  }

  goPage(next: number): void {
    if (next < 1 || (next - 1) * this.limit() >= this.total()) return;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { page: next, limit: this.limit() },
      queryParamsHandling: 'merge',
    });
  }

  rangeLabel(): string {
    if (!this.total()) return '0 viajes';
    const start = (this.page() - 1) * this.limit() + 1;
    const end = Math.min(this.page() * this.limit(), this.total());
    return `${start}–${end} de ${this.total()}`;
  }

  openCreate(): void {
    const ref = this.dialog.open(CreateShippingDialogComponent, {
      width: '1280px',
      maxWidth: '98vw',
      maxHeight: '94vh',
      panelClass: 'create-shipping-dialog-panel',
    });
    ref.afterClosed().subscribe((result) => {
      if (!result?.created) return;
      if (this.view() === 'list') this.load();
      else this.calendar?.reload();
    });
  }

  openDetail(trip: ShippingListItem): void {
    const ref = this.dialog.open(ShippingDetailDialogComponent, {
      width: '96vw',
      maxWidth: '1680px',
      maxHeight: '96vh',
      data: { shippingId: trip.id },
    });
    ref.afterClosed().subscribe((result) => {
      if (result?.updated && this.view() === 'list') this.load();
    });
  }

  private load(): void {
    const page = this.page();
    const limit = this.limit();
    this.loading.set(true);
    this.shippingService
      .getShippings({
        status: this.status() || undefined,
        page,
        limit,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          if (this.view() !== 'list' || this.page() !== page) return;
          this.rows.set(res.data ?? []);
          this.total.set(res.total ?? 0);
          this.loading.set(false);
        },
        error: () => {
          if (this.view() !== 'list') return;
          this.rows.set([]);
          this.total.set(0);
          this.loading.set(false);
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: 'No se pudo cargar los viajes', type: 'error' },
            duration: 5000,
          });
        },
      });
  }
}
