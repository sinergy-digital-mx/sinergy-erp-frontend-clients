import { Component, OnDestroy, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';
import { LucideAngularModule, ChevronLeft, ChevronRight, Plus } from 'lucide-angular';
import { CustomSnackbarComponent } from '../../../../core/components/custom-snackbar/custom-snackbar.component';
import { SpinnerComponent } from '../../../../core/components/spinner/spinner.component';
import { HasPermissionDirective } from '../../../../core/directives/has-permission.directive';
import { SHIPPING_PERMISSIONS } from '../../config/permissions.config';
import {
  ShippingListItem,
  getShippingStatusColors,
  normalizeShippingStatusKey,
} from '../../models/shipping.model';
import { ShippingService } from '../../services/shipping.service';
import { CreateShippingDialogComponent } from '../../components/create-shipping-dialog/create-shipping-dialog.component';
import { ShippingDetailDialogComponent } from '../../components/shipping-detail-dialog/shipping-detail-dialog.component';

interface CalendarDay {
  date: Date;
  iso: string;
  inMonth: boolean;
  isToday: boolean;
  events: CalendarEvent[];
}

interface CalendarEvent {
  id: string;
  title: string;
  status: string;
  colors: { background: string; text: string };
  shipping: ShippingListItem;
}

@Component({
  selector: 'app-shippings-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule, HasPermissionDirective, LucideAngularModule, SpinnerComponent],
  templateUrl: './shippings-calendar.component.html',
  styleUrl: './shippings-calendar.component.scss',
})
export class ShippingsCalendarComponent implements OnInit, OnDestroy {
  readonly ChevronLeft = ChevronLeft;
  readonly ChevronRight = ChevronRight;
  readonly Plus = Plus;
  readonly permissions = SHIPPING_PERMISSIONS;
  readonly weekDays = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  month = signal(new Date());
  statusFilter = signal<string>('');
  loading = signal(false);
  shippings = signal<ShippingListItem[]>([]);

  monthLabel = computed(() =>
    this.month().toLocaleDateString('es-MX', { month: 'long', year: 'numeric' })
  );

  days = computed(() => this.buildCalendarDays(this.month(), this.shippings()));

  private destroy$ = new Subject<void>();
  private selectedDayIso: string | null = null;

  constructor(
    private shippingService: ShippingService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      const monthParam = params['month'];
      if (monthParam && /^\d{4}-\d{2}$/.test(monthParam)) {
        const [y, m] = monthParam.split('-').map(Number);
        this.month.set(new Date(y, m - 1, 1));
      }
      this.statusFilter.set(params['status'] || '');
      this.loadMonth();
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private monthKey(d: Date): string {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  }

  private toIso(d: Date): string {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }

  private syncQuery(): void {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        month: this.monthKey(this.month()),
        status: this.statusFilter() || undefined,
      },
      queryParamsHandling: 'merge',
    });
  }

  prevMonth(): void {
    const d = this.month();
    this.month.set(new Date(d.getFullYear(), d.getMonth() - 1, 1));
    this.syncQuery();
  }

  nextMonth(): void {
    const d = this.month();
    this.month.set(new Date(d.getFullYear(), d.getMonth() + 1, 1));
    this.syncQuery();
  }

  onStatusChange(value: string): void {
    this.statusFilter.set(value);
    this.syncQuery();
  }

  loadMonth(): void {
    const d = this.month();
    const from = new Date(d.getFullYear(), d.getMonth(), 1);
    const to = new Date(d.getFullYear(), d.getMonth() + 1, 0);
    this.loading.set(true);
    this.shippingService
      .getShippings({
        date_from: this.toIso(from),
        date_to: this.toIso(to),
        status: this.statusFilter() || undefined,
        limit: 100,
      })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.shippings.set(res.data ?? []);
          this.loading.set(false);
        },
        error: () => {
          this.shippings.set([]);
          this.loading.set(false);
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: 'Error al cargar envíos', type: 'error' },
            duration: 5000,
          });
        },
      });
  }

  private parseLocalDate(value: string): Date {
    const [y, m, day] = value.slice(0, 10).split('-').map(Number);
    return new Date(y, (m || 1) - 1, day || 1);
  }

  private eventTitle(s: ShippingListItem): string {
    const short = s.short_id || s.id?.slice(0, 8) || '';
    const driver = s.driver_name || 'Sin chofer';
    const truck = s.truck_placa || s.truck_name || 'Sin camión';
    return `#${short} · ${driver} · ${truck} · ${s.status}`;
  }

  private buildCalendarDays(month: Date, shippings: ShippingListItem[]): CalendarDay[] {
    const year = month.getFullYear();
    const m = month.getMonth();
    const first = new Date(year, m, 1);
    const startOffset = (first.getDay() + 6) % 7; // Monday-first
    const gridStart = new Date(year, m, 1 - startOffset);
    const todayIso = this.toIso(new Date());
    const byDate = new Map<string, CalendarEvent[]>();

    for (const s of shippings) {
      if (!s.shipping_date) continue;
      const iso = s.shipping_date.slice(0, 10);
      const list = byDate.get(iso) ?? [];
      list.push({
        id: s.id,
        title: this.eventTitle(s),
        status: String(s.status),
        colors: getShippingStatusColors(s.status),
        shipping: s,
      });
      byDate.set(iso, list);
    }

    const days: CalendarDay[] = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(gridStart.getFullYear(), gridStart.getMonth(), gridStart.getDate() + i);
      const iso = this.toIso(date);
      days.push({
        date,
        iso,
        inMonth: date.getMonth() === m,
        isToday: iso === todayIso,
        events: byDate.get(iso) ?? [],
      });
    }
    return days;
  }

  onDayClick(day: CalendarDay): void {
    this.selectedDayIso = day.iso;
  }

  openCreate(dayIso?: string): void {
    const ref = this.dialog.open(CreateShippingDialogComponent, {
      width: '1280px',
      maxWidth: '98vw',
      maxHeight: '94vh',
      panelClass: 'create-shipping-dialog-panel',
      data: { shippingDate: dayIso || this.selectedDayIso || undefined },
    });
    ref.afterClosed().subscribe((result) => {
      if (!result?.created) return;
      const date = result.shipping?.shipping_date?.slice(0, 10);
      if (date) {
        const parsed = this.parseLocalDate(date);
        this.month.set(new Date(parsed.getFullYear(), parsed.getMonth(), 1));
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: { month: this.monthKey(this.month()) },
          queryParamsHandling: 'merge',
        });
      }
      this.loadMonth();
    });
  }

  openDetail(event: CalendarEvent, e: MouseEvent): void {
    e.stopPropagation();
    const ref = this.dialog.open(ShippingDetailDialogComponent, {
      width: '1280px',
      maxWidth: '98vw',
      maxHeight: '94vh',
      data: { shippingId: event.id },
    });
    ref.afterClosed().subscribe((result) => {
      if (result?.updated) this.loadMonth();
    });
  }

  legendItems() {
    return [
      { label: 'Creado', key: 'creado' },
      { label: 'En Ruta', key: 'en ruta' },
      { label: 'Completado', key: 'completado' },
      { label: 'Cancelado', key: 'cancelado' },
    ].map((item) => ({
      ...item,
      colors: getShippingStatusColors(item.label),
    }));
  }

  normalize(status: string): string {
    return normalizeShippingStatusKey(status);
  }
}
