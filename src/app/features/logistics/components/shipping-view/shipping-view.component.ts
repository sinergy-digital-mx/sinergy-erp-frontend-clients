import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { LucideAngularModule, MapPin, Plus, RefreshCw, X } from 'lucide-angular';
import { CustomSnackbarComponent } from '../../../../core/components/custom-snackbar/custom-snackbar.component';
import { HasPermissionDirective } from '../../../../core/directives/has-permission.directive';
import { ConfirmDialogComponent } from '../../../rbac-tenant-ui/components/confirm-dialog/confirm-dialog.component';
import {
  CustomerAddressDialogComponent,
} from '../../../customers/components/customer-address-dialog/customer-address-dialog.component';
import { SHIPPING_PERMISSIONS } from '../../config/permissions.config';
import {
  Shipping,
  ShippingStatus,
  ShippingStop,
  countMissingGps,
  enrichShippingStop,
  getNextShippingStatuses,
  getShippingStatusColors,
  normalizeShippingStatusKey,
} from '../../models/shipping.model';
import { ShippingService } from '../../services/shipping.service';
import { ShippingMapComponent } from '../shipping-map/shipping-map.component';
import { AddShippingStopsDialogComponent } from '../add-shipping-stops-dialog/add-shipping-stops-dialog.component';
import { WarehouseLocationDialogComponent } from '../warehouse-location-dialog/warehouse-location-dialog.component';

@Component({
  selector: 'app-shipping-view',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HasPermissionDirective,
    LucideAngularModule,
    ShippingMapComponent,
  ],
  templateUrl: './shipping-view.component.html',
  styleUrl: './shipping-view.component.scss',
})
export class ShippingViewComponent implements OnChanges, OnDestroy {
  @Input({ required: true }) shippingId!: string;
  @Input() active = true;
  @Input() embedded = false;
  @Input() currentSalesOrderId: string | null = null;
  @Input() allowOpenOrderDetail = true;
  @Input() showClose = false;

  @Output() shippingUpdated = new EventEmitter<Shipping>();
  @Output() closed = new EventEmitter<void>();

  readonly MapPin = MapPin;
  readonly Plus = Plus;
  readonly RefreshCw = RefreshCw;
  readonly X = X;
  readonly permissions = SHIPPING_PERMISSIONS;

  shipping = signal<Shipping | null>(null);
  stops = signal<ShippingStop[]>([]);
  loading = signal(false);
  statusUpdating = signal(false);
  recalculating = signal(false);
  errorMessage = signal<string | null>(null);

  private destroy$ = new Subject<void>();
  private loadedForId: string | null = null;

  constructor(
    private shippingService: ShippingService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.active || !this.shippingId) return;
    const idChanged = changes['shippingId'] && this.shippingId !== this.loadedForId;
    const becameActive = changes['active'] && this.active && !changes['active'].previousValue;
    if (idChanged || becameActive || (changes['shippingId'] && this.active)) {
      this.load();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  load(): void {
    if (!this.shippingId) return;
    this.loading.set(true);
    this.errorMessage.set(null);
    this.shippingService
      .getShipping(this.shippingId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (shipping) => {
          this.applyShipping(shipping);
          this.loadedForId = this.shippingId;
          this.loading.set(false);
        },
        error: (err) => {
          this.loading.set(false);
          this.shipping.set(null);
          this.stops.set([]);
          const message =
            err?.status === 404
              ? 'No encontrado'
              : err?.error?.message || 'Error al cargar el envío';
          this.errorMessage.set(message);
        },
      });
  }

  private applyShipping(shipping: Shipping): void {
    const stops = (shipping.stops ?? [])
      .slice()
      .sort((a, b) => (a.stop_sequence ?? 0) - (b.stop_sequence ?? 0))
      .map(enrichShippingStop);
    this.shipping.set({ ...shipping, stops });
    this.stops.set(stops);
  }

  gpsSummary() {
    return countMissingGps(this.shipping());
  }

  isOriginMissing(): boolean {
    return this.gpsSummary().originMissing;
  }

  statusColors(status: string | null | undefined) {
    return getShippingStatusColors(status);
  }

  nextStatuses(): ShippingStatus[] {
    return getNextShippingStatuses(this.shipping()?.status);
  }

  isCreado(): boolean {
    return normalizeShippingStatusKey(this.shipping()?.status) === 'creado';
  }

  isCurrentStop(stop: ShippingStop): boolean {
    return !!this.currentSalesOrderId && stop.sales_order_id === this.currentSalesOrderId;
  }

  originLabel(): string {
    const s = this.shipping();
    return s?.origin_warehouse_name || s?.origin?.name || s?.origin?.warehouse_name || 'CEDIS';
  }

  stopLabel(stop: ShippingStop): string {
    return stop.folio || stop.order_number || stop.sales_order_id?.slice(0, 8) || 'OV';
  }

  onStatusSelect(status: string): void {
    if (!status || !this.shipping()) return;
    const confirmRef = this.dialog.open(ConfirmDialogComponent, {
      width: '420px',
      data: {
        title: 'Cambiar estado',
        message: `¿Cambiar el envío a «${status}»?`,
        confirmText: 'Confirmar',
        cancelText: 'Cancelar',
        isDangerous: status === 'Cancelado',
      },
    });
    confirmRef.afterClosed().subscribe((ok) => {
      if (!ok) return;
      this.statusUpdating.set(true);
      this.shippingService.updateStatus(this.shippingId, status).subscribe({
        next: (res) => {
          this.statusUpdating.set(false);
          this.applyShipping(res.shipping);
          this.shippingUpdated.emit(res.shipping);
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message: res.message || `Estado: ${status}`, type: 'success' },
            duration: 4000,
          });
        },
        error: (err) => {
          this.statusUpdating.set(false);
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: {
              message: err?.error?.message || 'No se pudo cambiar el estado',
              type: 'error',
            },
            duration: 6000,
          });
        },
      });
    });
  }

  openAddStops(): void {
    const shipping = this.shipping();
    if (!shipping?.origin_warehouse_id) return;
    const assigned = new Set(this.stops().map((s) => s.sales_order_id));
    const ref = this.dialog.open(AddShippingStopsDialogComponent, {
      width: '720px',
      maxWidth: '95vw',
      data: {
        shippingId: shipping.id,
        warehouseId: shipping.origin_warehouse_id,
        assignedOrderIds: Array.from(assigned),
      },
    });
    ref.afterClosed().subscribe((updated) => {
      if (updated) {
        this.applyShipping(updated);
        this.shippingUpdated.emit(updated);
      }
    });
  }

  recalculate(): void {
    this.recalculating.set(true);
    this.shippingService.recalculateDistance(this.shippingId).subscribe({
      next: (res) => {
        this.recalculating.set(false);
        this.applyShipping(res.shipping);
        this.shippingUpdated.emit(res.shipping);
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: res.message || 'Distancia recalculada', type: 'success' },
          duration: 4000,
        });
      },
      error: (err) => {
        this.recalculating.set(false);
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: {
            message: err?.error?.message || 'No se pudo recalcular la distancia',
            type: 'error',
          },
          duration: 6000,
        });
      },
    });
  }

  private afterGpsFixed(): void {
    this.shippingService.recalculateDistance(this.shippingId).subscribe({
      next: (res) => {
        this.applyShipping(res.shipping);
        this.shippingUpdated.emit(res.shipping);
      },
      error: () => this.load(),
    });
  }

  openEditOrigin(): void {
    const s = this.shipping();
    const warehouseId = s?.origin?.warehouse_id || s?.origin_warehouse_id;
    if (!warehouseId) return;
    const ref = this.dialog.open(WarehouseLocationDialogComponent, {
      width: '960px',
      maxWidth: '96vw',
      data: {
        warehouseId,
        warehouseName: this.originLabel(),
      },
    });
    ref.afterClosed().subscribe((ok) => {
      if (ok) this.afterGpsFixed();
    });
  }

  openFixStopGps(stop: ShippingStop): void {
    const customerId = stop.customer_id;
    if (customerId == null) {
      this.snackBar.openFromComponent(CustomSnackbarComponent, {
        data: { message: 'Esta parada no tiene cliente asociado', type: 'error' },
        duration: 4000,
      });
      return;
    }

    const hasAddress = !!stop.customer_address_id;
    const ref = this.dialog.open(CustomerAddressDialogComponent, {
      width: '960px',
      maxWidth: '96vw',
      data: {
        customerId: String(customerId),
        defaultType: 'shipping',
        address: hasAddress
          ? {
              id: String(stop.customer_address_id),
              customer_id: String(customerId),
              type: 'shipping',
              street_address: stop.address_summary || '',
              city: '',
              state: '',
              postal_code: '',
              country: 'México',
              latitude: stop.delivery_latitude,
              longitude: stop.delivery_longitude,
            }
          : null,
      },
    });
    ref.afterClosed().subscribe((ok) => {
      if (ok) this.afterGpsFixed();
    });
  }

  openOrder(stop: ShippingStop): void {
    if (!this.allowOpenOrderDetail || !stop.sales_order_id) return;
    this.router.navigate(['/sales-orders'], {
      queryParams: { openOrderId: stop.sales_order_id },
    });
  }

  formatDate(value: string | undefined): string {
    if (!value) return '—';
    const [y, m, d] = value.slice(0, 10).split('-').map(Number);
    if (!y || !m || !d) return value;
    return new Date(y, m - 1, d).toLocaleDateString('es-MX', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  }

  distanceLabel(): string {
    const km = this.shipping()?.distance_km;
    return typeof km === 'number' ? `${km.toFixed(1)} km` : '—';
  }

  close(): void {
    this.closed.emit();
  }
}
