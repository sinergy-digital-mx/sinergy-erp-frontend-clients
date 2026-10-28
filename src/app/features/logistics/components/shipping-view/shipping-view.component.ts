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
import { SpinnerComponent } from '../../../../core/components/spinner/spinner.component';
import { HasPermissionDirective } from '../../../../core/directives/has-permission.directive';
import { AuthService } from '../../../../core/services/auth.service';
import { ConfirmDialogComponent } from '../../../rbac-tenant-ui/components/confirm-dialog/confirm-dialog.component';
import {
  StopAddressPickerDialogComponent,
  StopAddressPickerResult,
} from '../stop-address-picker-dialog/stop-address-picker-dialog.component';
import { cartaPorteReadyLabel } from '../../models/carta-porte-catalogs';
import { Truck, truckBusyLabel, truckSelectLabel } from '../../models/truck.model';
import { TruckFormModalComponent } from '../truck-form-modal/truck-form-modal.component';
import { TruckService } from '../../services/truck.service';
import { User } from '../../../rbac-tenant-ui/models';
import { UserDetailModalComponent } from '../../../rbac-tenant-ui/components/user-detail-modal/user-detail-modal.component';
import { UserService } from '../../../rbac-tenant-ui/services/user.service';
import { GPS_TRACKING_PERMISSIONS, SHIPPING_PERMISSIONS } from '../../config/permissions.config';
import { GpsTrackingService } from '../../services/gps-tracking.service';
import { ShippingMapComponent, ShippingMapVehicle } from '../shipping-map/shipping-map.component';
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
import { AddShippingStopsDialogComponent } from '../add-shipping-stops-dialog/add-shipping-stops-dialog.component';
import { BranchLocationDialogComponent } from '../branch-location-dialog/branch-location-dialog.component';

@Component({
  selector: 'app-shipping-view',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    HasPermissionDirective,
    LucideAngularModule,
    ShippingMapComponent,
    SpinnerComponent,
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

  panel = signal<'route' | 'carta'>('route');
  shipping = signal<Shipping | null>(null);
  trucks = signal<Truck[]>([]);
  drivers = signal<User[]>([]);
  crewSaving = signal(false);
  stops = signal<ShippingStop[]>([]);
  loading = signal(false);
  statusUpdating = signal(false);
  recalculating = signal(false);
  addressUpdating = signal(false);
  errorMessage = signal<string | null>(null);
  vehicle = signal<ShippingMapVehicle | null>(null);

  private destroy$ = new Subject<void>();
  private loadedForId: string | null = null;
  private vehicleTimer: ReturnType<typeof setInterval> | null = null;
  private trackedTruckId: string | null = null;

  constructor(
    private shippingService: ShippingService,
    private truckService: TruckService,
    private userService: UserService,
    private gpsTracking: GpsTrackingService,
    private auth: AuthService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.active || !this.shippingId) return;
    if (changes['shippingId'] && this.shippingId !== this.loadedForId) {
      this.panel.set('route');
    }
    const idChanged = changes['shippingId'] && this.shippingId !== this.loadedForId;
    const becameActive = changes['active'] && this.active && !changes['active'].previousValue;
    if (idChanged || becameActive || (changes['shippingId'] && this.active)) {
      this.loadCrewCatalogs();
      this.load();
    }
  }

  ngOnDestroy(): void {
    this.clearVehicleTimer();
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
    if (!this.pesoKg && shipping.carta_porte_peso_kg != null) {
      this.pesoKg = String(shipping.carta_porte_peso_kg);
    }
    this.trackVehicle(shipping);
  }

  canReassignCrew(shipping: Shipping): boolean {
    if (shipping.status !== 'Creado' && shipping.status !== 'En Ruta') return false;
    return !(shipping.carta_porte_uuid && shipping.carta_porte_environment !== 'demo');
  }

  driverOptions(): User[] {
    const list = this.drivers();
    const current = this.shipping();
    if (!current?.driver_id || list.some((item) => item.id === current.driver_id)) return list;
    return [
      {
        id: current.driver_id,
        email: '',
        status: 'active',
        first_name: current.driver_name || 'Chofer',
        carta_porte_ready: current.driver_carta_porte_ready,
        carta_porte_missing: current.driver_carta_porte_missing,
      },
      ...list,
    ];
  }

  truckOptions(): Truck[] {
    const list = this.trucks();
    const current = this.shipping();
    if (!current?.truck_id || list.some((item) => item.id === current.truck_id)) return list;
    return [
      {
        id: current.truck_id,
        name: current.truck_name || 'Camión',
        placa: current.truck_placa || '',
        status: 'active',
        carta_porte_ready: current.truck_carta_porte_ready,
        carta_porte_missing: current.truck_carta_porte_missing,
      },
      ...list,
    ];
  }

  driverOptionLabel(user: User): string {
    const name = [user.first_name, user.last_name].filter(Boolean).join(' ').trim() || user.email || 'Chofer';
    return `${name} · ${cartaPorteReadyLabel(user.carta_porte_ready)}`;
  }

  truckOptionLabel(truck: Truck): string {
    const currentId = this.shipping()?.id;
    const busy =
      truck.active_shipping_id && truck.active_shipping_id !== currentId
        ? ` · ${truckBusyLabel(truck)}`
        : '';
    return `${truckSelectLabel(truck)} · ${cartaPorteReadyLabel(truck.carta_porte_ready)}${busy}`;
  }

  crewDriverReady(shipping: Shipping): boolean {
    const driver = this.drivers().find((item) => item.id === shipping.driver_id);
    if (driver) return driver.carta_porte_ready === true;
    return shipping.driver_carta_porte_ready === true;
  }

  crewTruckReady(shipping: Shipping): boolean {
    const truck = this.trucks().find((item) => item.id === shipping.truck_id);
    if (truck) return truck.carta_porte_ready === true;
    return shipping.truck_carta_porte_ready === true;
  }

  crewDriverStatus(shipping: Shipping): string {
    return this.crewStatus(
      this.crewDriverReady(shipping),
      this.drivers().find((item) => item.id === shipping.driver_id)?.carta_porte_missing ??
        shipping.driver_carta_porte_missing,
    );
  }

  crewTruckStatus(shipping: Shipping): string {
    return this.crewStatus(
      this.crewTruckReady(shipping),
      this.trucks().find((item) => item.id === shipping.truck_id)?.carta_porte_missing ??
        shipping.truck_carta_porte_missing,
    );
  }

  changeCrewDriver(driverId: string): void {
    const current = this.shipping();
    if (!current?.truck_id || !driverId || driverId === current.driver_id) return;
    this.saveCrew(driverId, current.truck_id);
  }

  changeCrewTruck(truckId: string): void {
    const current = this.shipping();
    if (!current?.driver_id || !truckId || truckId === current.truck_id) return;
    this.saveCrew(current.driver_id, truckId);
  }

  editCrewDriver(): void {
    const driverId = this.shipping()?.driver_id;
    if (!driverId) return;
    const known = this.drivers().find((item) => item.id === driverId);
    if (known) {
      this.openDriverEditor(known);
      return;
    }
    this.userService.getUserById(driverId).subscribe({
      next: (user) => this.openDriverEditor(user),
      error: () => this.toast('No se pudo abrir el chofer', 'error'),
    });
  }

  editCrewTruck(): void {
    const truckId = this.shipping()?.truck_id;
    if (!truckId) return;
    const known = this.trucks().find((item) => item.id === truckId);
    if (known) {
      this.openTruckEditor(known);
      return;
    }
    this.truckService.getTruck(truckId).subscribe({
      next: (truck) => this.openTruckEditor(truck),
      error: () => this.toast('No se pudo abrir el camión', 'error'),
    });
  }

  private openDriverEditor(driver: User): void {
    this.dialog
      .open(UserDetailModalComponent, {
        width: '840px',
        maxWidth: 'calc(100vw - 1rem)',
        maxHeight: '90vh',
        panelClass: 'custom-dialog-container',
        data: { user: driver, isNew: false },
      })
      .afterClosed()
      .subscribe((saved) => {
        if (!saved) return;
        this.loadCrewCatalogs();
        this.load();
      });
  }

  private openTruckEditor(truck: Truck): void {
    this.dialog
      .open(TruckFormModalComponent, {
        width: '700px',
        maxWidth: '95vw',
        disableClose: true,
        data: { truck },
      })
      .afterClosed()
      .subscribe((saved: Truck | null) => {
        if (!saved) return;
        this.loadCrewCatalogs();
        this.load();
      });
  }

  private crewStatus(ready: boolean, missing: string[] | null | undefined): string {
    if (ready) return 'Carta porte completo';
    const detail = (missing ?? []).filter(Boolean).join(' · ');
    return detail ? `Carta porte no completo: ${detail}` : 'Carta porte no completo';
  }

  private saveCrew(driverId: string, truckId: string): void {
    const current = this.shipping();
    if (!current) return;
    const hadDemoStamp = current.carta_porte_environment === 'demo' && !!current.carta_porte_uuid;
    this.crewSaving.set(true);
    this.shippingService.updateCrew(current.id, driverId, truckId).subscribe({
      next: (res) => {
        this.crewSaving.set(false);
        this.applyShipping(res.shipping);
        this.shippingUpdated.emit(res.shipping);
        this.toast(
          hadDemoStamp
            ? 'Chofer y camión actualizados. La carta porte de prueba se quitó para volver a generarla.'
            : 'Chofer y camión actualizados',
          'success',
        );
      },
      error: (err) => {
        this.crewSaving.set(false);
        this.toast(this.apiMessage(err, 'No se pudo cambiar el chofer o el camión'), 'error');
        this.load();
      },
    });
  }

  private loadCrewCatalogs(): void {
    this.truckService.getTrucks({ status: 'active', limit: 100 }).subscribe({
      next: (res) => this.trucks.set(res.data ?? []),
      error: () => this.trucks.set([]),
    });
    this.userService.refreshUsers().subscribe({
      next: (users) => this.drivers.set((users ?? []).filter((user) => this.isActiveDriver(user))),
      error: () => this.drivers.set([]),
    });
  }

  private isActiveDriver(user: User): boolean {
    const status =
      typeof user.status === 'string'
        ? user.status
        : user.status?.name || user.status?.code || '';
    const flag = user.is_driver as unknown;
    const isDriver = flag === true || flag === 1 || flag === '1';
    const code = String(status).toLowerCase();
    return code !== 'inactive' && code !== 'deleted' && isDriver;
  }

  private trackVehicle(shipping: Shipping): void {
    const truckId = shipping.truck_id || null;
    if (!this.auth.hasPermission(GPS_TRACKING_PERMISSIONS.read) || !truckId) {
      this.clearVehicleTimer();
      this.trackedTruckId = null;
      this.vehicle.set(null);
      return;
    }
    if (this.trackedTruckId === truckId && this.vehicleTimer) return;
    this.trackedTruckId = truckId;
    this.clearVehicleTimer();
    const pull = () => {
      this.gpsTracking
        .getPositions(truckId)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            const unit = (response.units ?? []).find(
              (row) => Number.isFinite(Number(row.latitude)) && Number.isFinite(Number(row.longitude))
            );
            if (!unit) {
              this.vehicle.set(null);
              return;
            }
            this.vehicle.set({
              lat: Number(unit.latitude),
              lng: Number(unit.longitude),
              title: unit.truck_name || unit.name,
              speedKmh: unit.speed,
              speedMeasure: unit.speed_measure,
              heading: unit.heading,
              ignition: unit.ignition,
              reportedAt: this.formatReportedAt(unit.reported_at),
              address: unit.address,
            });
          },
          error: () => this.vehicle.set(null),
        });
    };
    pull();
    this.vehicleTimer = setInterval(pull, 45000);
  }

  private clearVehicleTimer(): void {
    if (this.vehicleTimer) {
      clearInterval(this.vehicleTimer);
      this.vehicleTimer = null;
    }
  }

  private formatReportedAt(value: string | null | undefined): string | null {
    if (!value) return null;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return value;
    return new Intl.DateTimeFormat('es-MX', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
    }).format(date);
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

  transferSummary(shipping: Shipping): string {
    return (shipping.transfers ?? [])
      .map((transfer) => {
        const dest = transfer.destination_warehouse_name
          ? ` → ${transfer.destination_warehouse_name}`
          : '';
        return `${transfer.folio}${dest}`;
      })
      .join(' · ');
  }

  originLabel(): string {
    const s = this.shipping();
    return (
      s?.origin_billing_branch_name ||
      s?.origin?.name ||
      s?.origin_warehouse_name ||
      s?.origin?.warehouse_name ||
      'Sucursal'
    );
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
    const billingBranchId =
      shipping?.origin_billing_branch_id || shipping?.origin?.billing_branch_id;
    if (!shipping || !billingBranchId) return;
    const assigned = new Set(this.stops().map((s) => s.sales_order_id));
    const ref = this.dialog.open(AddShippingStopsDialogComponent, {
      width: '720px',
      maxWidth: '95vw',
      data: {
        shippingId: shipping.id,
        billingBranchId,
        fiscalConfigurationId: shipping.origin?.fiscal_configuration_id,
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

  isSelectedAddress(stop: ShippingStop, addressId: number): boolean {
    return String(stop.customer_address_id ?? '') === String(addressId);
  }

  selectStopAddress(stop: ShippingStop, addressId: number): void {
    if (!this.isCreado() || this.addressUpdating() || this.isSelectedAddress(stop, addressId)) {
      return;
    }
    this.addressUpdating.set(true);
    this.shippingService.setStopAddress(this.shippingId, stop.sales_order_id, addressId).subscribe({
      next: (res) => {
        this.addressUpdating.set(false);
        this.applyShipping(res.shipping);
        this.shippingUpdated.emit(res.shipping);
      },
      error: (err) => {
        this.addressUpdating.set(false);
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: {
            message: err?.error?.message || 'No se pudo cambiar la dirección',
            type: 'error',
          },
          duration: 5000,
        });
        this.load();
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
    const fiscalConfigId = s?.origin?.fiscal_configuration_id;
    const branchId = s?.origin?.billing_branch_id || s?.origin_billing_branch_id;
    if (!fiscalConfigId || !branchId) return;
    const ref = this.dialog.open(BranchLocationDialogComponent, {
      width: '960px',
      maxWidth: '96vw',
      data: {
        fiscalConfigId,
        branchId,
        branchName: this.originLabel(),
      },
    });
    ref.afterClosed().subscribe((ok) => {
      if (ok) this.afterGpsFixed();
    });
  }

  selectedAddressLine(stop: ShippingStop): string {
    const selected = stop.customer_addresses?.find(
      (item) => String(item.id) === String(stop.customer_address_id ?? ''),
    );
    if (selected) {
      return `${selected.type_label || 'Dirección'} · ${selected.address_summary || 'Sin calle'}`;
    }
    return stop.address_summary || 'Sin dirección';
  }

  openAddressPicker(stop: ShippingStop): void {
    const customerId = stop.customer_id;
    if (customerId == null) {
      this.snackBar.openFromComponent(CustomSnackbarComponent, {
        data: { message: 'Esta parada no tiene cliente asociado', type: 'error' },
        duration: 4000,
      });
      return;
    }
    const ref = this.dialog.open(StopAddressPickerDialogComponent, {
      width: '480px',
      maxWidth: '96vw',
      maxHeight: '86vh',
      panelClass: 'stop-address-picker-panel',
      data: {
        customerId: String(customerId),
        customerName: stop.customer_name || 'Cliente',
        selectedId: stop.customer_address_id ?? null,
        addresses: stop.customer_addresses ?? [],
        canAssign: this.isCreado(),
      },
    });
    ref.afterClosed().subscribe((result: StopAddressPickerResult | undefined) => {
      if (!result) return;
      if (
        this.isCreado() &&
        typeof result.addressId === 'number' &&
        !this.isSelectedAddress(stop, result.addressId)
      ) {
        this.selectStopAddress(stop, result.addressId);
        return;
      }
      if (result.locationChanged) this.afterGpsFixed();
    });
  }

  openOrder(stop: ShippingStop): void {
    if (!this.allowOpenOrderDetail || !stop.sales_order_id) return;
    this.router.navigate(['/sales-orders'], {
      queryParams: { openOrderId: stop.sales_order_id },
    });
  }

  formatDate(value: string | undefined): string {
    const date = this.shippingDate(value);
    if (!date) return value || '—';
    return date.toLocaleDateString('es-MX', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  }

  dateDay(value: string | undefined): string {
    const date = this.shippingDate(value);
    return date ? String(date.getDate()) : '—';
  }

  dateMonth(value: string | undefined): string {
    const date = this.shippingDate(value);
    if (!date) return '';
    return date.toLocaleDateString('es-MX', { month: 'short' }).replace(/\./g, '').trim();
  }

  private shippingDate(value: string | undefined): Date | null {
    if (!value) return null;
    const [y, m, d] = value.slice(0, 10).split('-').map(Number);
    if (!y || !m || !d) return null;
    return new Date(y, m - 1, d);
  }

  distanceLabel(): string {
    const km = this.shipping()?.distance_km;
    return typeof km === 'number' ? `${km.toFixed(1)} km` : '—';
  }

  cargoLabel(): string {
    switch (this.shipping()?.cargo_kind) {
      case 'inventory_transfer':
        return 'Transferencias';
      case 'mixed':
        return 'Órdenes y transferencias';
      default:
        return 'Órdenes';
    }
  }

  pesoKg = '';
  stamping = signal(false);
  stampEnvironment = signal<'demo' | 'production'>(
    typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
      ? 'demo'
      : 'production',
  );

  cartaPorteIsFinal(shipping: Shipping): boolean {
    return !!shipping.carta_porte_uuid && shipping.carta_porte_environment !== 'demo';
  }

  selectStampEnvironment(environment: 'demo' | 'production'): void {
    if (this.stamping() || environment === this.stampEnvironment()) return;
    if (environment === 'production' && this.stampEnvironment() === 'demo') {
      const local =
        typeof window !== 'undefined' &&
        (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
      if (local && !window.confirm('Esto timbrará un CFDI real con Finkok producción. ¿Continuar?')) {
        return;
      }
    }
    this.stampEnvironment.set(environment);
  }

  stampCartaPorte(): void {
    const peso = Number(this.pesoKg);
    if (!Number.isFinite(peso) || peso <= 0) {
      this.toast('Indica el peso bruto de la carga en kilogramos', 'error');
      return;
    }
    const environment = this.stampEnvironment();
    this.stamping.set(true);
    this.shippingService.stampCartaPorte(this.shippingId, peso, environment).subscribe({
      next: (res) => {
        this.stamping.set(false);
        this.applyShipping(res.shipping);
        this.shippingUpdated.emit(res.shipping);
        this.toast(
          environment === 'demo' ? 'Carta porte de prueba timbrada' : 'Carta porte timbrada',
          'success',
        );
      },
      error: (err) => {
        this.stamping.set(false);
        this.toast(this.apiMessage(err, 'No se pudo timbrar la carta porte'), 'error');
        this.load();
      },
    });
  }

  downloadCartaPorte(): void {
    const current = this.shipping();
    if (!current?.id) return;
    this.shippingService.downloadCartaPortePdf(current.id).subscribe({
      next: (blob) => {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `carta-porte-${(current.carta_porte_uuid || current.id).slice(0, 8)}.pdf`;
        link.click();
        URL.revokeObjectURL(url);
      },
      error: () => this.toast('No se pudo descargar el PDF', 'error'),
    });
  }

  private toast(message: string, type: 'success' | 'error'): void {
    this.snackBar.openFromComponent(CustomSnackbarComponent, {
      data: { message, type },
      duration: 5000,
    });
  }

  private apiMessage(err: { error?: { message?: string | string[] } }, fallback: string): string {
    const message = err?.error?.message;
    if (Array.isArray(message)) return message.join('. ');
    return message || fallback;
  }

  close(): void {
    this.closed.emit();
  }
}
