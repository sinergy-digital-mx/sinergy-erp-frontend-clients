import { Component, OnDestroy, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  LucideAngularModule,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Navigation,
  Route,
  Truck,
} from 'lucide-angular';
import { Subject, forkJoin, takeUntil } from 'rxjs';
import { CustomSnackbarComponent } from '../../../../core/components/custom-snackbar/custom-snackbar.component';
import { SpinnerComponent } from '../../../../core/components/spinner/spinner.component';
import { HasPermissionDirective } from '../../../../core/directives/has-permission.directive';
import { TripCardComponent } from '../../components/trip-card/trip-card.component';
import { CreateShippingDialogComponent } from '../../components/create-shipping-dialog/create-shipping-dialog.component';
import { ShippingDetailDialogComponent } from '../../components/shipping-detail-dialog/shipping-detail-dialog.component';
import { SHIPPING_PERMISSIONS } from '../../config/permissions.config';
import { ShippingListItem } from '../../models/shipping.model';
import { ShippingService } from '../../services/shipping.service';

@Component({
  selector: 'app-logistics-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    HasPermissionDirective,
    LucideAngularModule,
    SpinnerComponent,
    TripCardComponent,
  ],
  templateUrl: './logistics-dashboard.component.html',
  styleUrl: './logistics-dashboard.component.scss',
})
export class LogisticsDashboardComponent implements OnInit, OnDestroy {
  readonly ChevronLeft = ChevronLeft;
  readonly ChevronRight = ChevronRight;
  readonly MapPin = MapPin;
  readonly Navigation = Navigation;
  readonly Route = Route;
  readonly Truck = Truck;
  readonly permissions = SHIPPING_PERMISSIONS;

  month = signal(new Date());
  loadingOpen = signal(true);
  loadingMonth = signal(true);
  openTrips = signal<ShippingListItem[]>([]);
  plannedTotal = signal(0);
  inRouteTotal = signal(0);
  monthTotal = signal(0);
  monthCompleted = signal(0);
  monthKm = signal(0);
  truncated = signal(false);

  todayLabel = this.formatToday();
  monthLabel = computed(() => this.formatMonth(this.month()));
  openCount = computed(() => this.plannedTotal() + this.inRouteTotal());
  openKm = computed(() =>
    this.openTrips().reduce((sum, trip) => sum + (Number(trip.distance_km) || 0), 0),
  );
  openStops = computed(() =>
    this.openTrips().reduce((sum, trip) => sum + (trip.stops?.length ?? 0), 0),
  );
  openUnits = computed(
    () => new Set(this.openTrips().map((trip) => trip.truck_id).filter(Boolean)).size,
  );

  private destroy$ = new Subject<void>();
  private monthRequest = 0;

  constructor(
    private shippingService: ShippingService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit(): void {
    this.loadOpen();
    this.loadMonth();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  prevMonth(): void {
    const current = this.month();
    this.month.set(new Date(current.getFullYear(), current.getMonth() - 1, 1));
    this.loadMonth();
  }

  nextMonth(): void {
    const current = this.month();
    this.month.set(new Date(current.getFullYear(), current.getMonth() + 1, 1));
    this.loadMonth();
  }

  formatCount(value: number): string {
    return new Intl.NumberFormat('es-MX').format(value);
  }

  formatKm(value: number): string {
    return `${this.formatKmValue(value)} km`;
  }

  formatKmValue(value: number): string {
    return new Intl.NumberFormat('es-MX', { maximumFractionDigits: 1 }).format(value);
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
      this.loadOpen();
      this.loadMonth();
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
      if (!result?.updated) return;
      this.loadOpen();
      this.loadMonth();
    });
  }

  private loadOpen(): void {
    this.loadingOpen.set(true);
    forkJoin({
      planned: this.shippingService.getShippings({ status: 'Creado', limit: 100, page: 1 }),
      inRoute: this.shippingService.getShippings({ status: 'En Ruta', limit: 100, page: 1 }),
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ planned, inRoute }) => {
          const trips = [...(planned.data ?? []), ...(inRoute.data ?? [])].sort((a, b) =>
            (a.shipping_date || '').localeCompare(b.shipping_date || ''),
          );
          this.openTrips.set(trips);
          this.plannedTotal.set(planned.total ?? trips.filter((t) => t.status === 'Creado').length);
          this.inRouteTotal.set(inRoute.total ?? 0);
          this.truncated.set(
            (planned.total ?? 0) > (planned.data?.length ?? 0) ||
              (inRoute.total ?? 0) > (inRoute.data?.length ?? 0),
          );
          this.loadingOpen.set(false);
        },
        error: () => {
          this.openTrips.set([]);
          this.plannedTotal.set(0);
          this.inRouteTotal.set(0);
          this.loadingOpen.set(false);
          this.notify('No se pudo cargar el resumen de viajes');
        },
      });
  }

  private loadMonth(): void {
    const request = ++this.monthRequest;
    const range = this.monthRange(this.month());
    this.loadingMonth.set(true);
    forkJoin({
      month: this.shippingService.getShippings({
        date_from: range.from,
        date_to: range.to,
        limit: 100,
        page: 1,
      }),
      completed: this.shippingService.getShippings({
        date_from: range.from,
        date_to: range.to,
        status: 'Completado',
        limit: 1,
        page: 1,
      }),
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ month, completed }) => {
          if (request !== this.monthRequest) return;
          const km = (month.data ?? []).reduce((sum, trip) => sum + (Number(trip.distance_km) || 0), 0);
          this.monthTotal.set(month.total ?? 0);
          this.monthCompleted.set(completed.total ?? 0);
          this.monthKm.set(km);
          this.loadingMonth.set(false);
        },
        error: () => {
          if (request !== this.monthRequest) return;
          this.monthTotal.set(0);
          this.monthCompleted.set(0);
          this.monthKm.set(0);
          this.loadingMonth.set(false);
        },
      });
  }

  private monthRange(date: Date): { from: string; to: string } {
    const from = new Date(date.getFullYear(), date.getMonth(), 1);
    const to = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return { from: this.toIso(from), to: this.toIso(to) };
  }

  private toIso(date: Date): string {
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${date.getFullYear()}-${month}-${day}`;
  }

  private formatMonth(date: Date): string {
    const label = date.toLocaleDateString('es-MX', { month: 'long', year: 'numeric' });
    return label.charAt(0).toUpperCase() + label.slice(1);
  }

  private formatToday(): string {
    return new Date()
      .toLocaleDateString('es-MX', { weekday: 'short', day: 'numeric', month: 'short' })
      .replace(',', '');
  }

  private notify(message: string): void {
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      data: { message, type: 'error' },
      duration: 5000,
    });
  }
}
