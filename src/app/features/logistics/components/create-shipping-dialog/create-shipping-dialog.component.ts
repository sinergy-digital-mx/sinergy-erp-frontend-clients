import { Component, Inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LucideAngularModule, X, MapPin } from 'lucide-angular';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { SearchComponent } from '../../../../core/components/search/search.component';
import { CustomSnackbarComponent } from '../../../../core/components/custom-snackbar/custom-snackbar.component';
import { ConfirmDialogComponent } from '../../../rbac-tenant-ui/components/confirm-dialog/confirm-dialog.component';
import { UserService } from '../../../rbac-tenant-ui/services/user.service';
import { User } from '../../../rbac-tenant-ui/models';
import { WarehouseService } from '../../../settings/services/warehouse.service';
import { Warehouse } from '../../../settings/models/warehouse.model';
import { SalesOrderService } from '../../../sales-orders/services/sales-order.service';
import { SalesOrder } from '../../../sales-orders/models/sales-order.model';
import {
  CustomerAddressDialogComponent,
} from '../../../customers/components/customer-address-dialog/customer-address-dialog.component';
import { Truck, truckSelectLabel } from '../../models/truck.model';
import {
  CreateShippingDto,
  ShippingOrderInput,
  ShippingOrigin,
  ShippingPreviewOrder,
  ShippingPreviewResult,
  ShippingRoutePoint,
} from '../../models/shipping.model';
import { TruckService } from '../../services/truck.service';
import { ShippingService } from '../../services/shipping.service';
import { ShippingMapComponent } from '../shipping-map/shipping-map.component';
import { WarehouseLocationDialogComponent } from '../warehouse-location-dialog/warehouse-location-dialog.component';

export interface CreateShippingDialogData {
  shippingDate?: string;
}

type WizardStep = 'form' | 'preview';

@Component({
  selector: 'app-create-shipping-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonComponent,
    SearchComponent,
    LucideAngularModule,
    ShippingMapComponent,
  ],
  templateUrl: './create-shipping-dialog.component.html',
  styleUrl: './create-shipping-dialog.component.scss',
})
export class CreateShippingDialogComponent implements OnInit {
  readonly X = X;
  readonly MapPin = MapPin;
  readonly truckSelectLabel = truckSelectLabel;

  form: FormGroup;
  step = signal<WizardStep>('form');
  warehouses = signal<Warehouse[]>([]);
  trucks = signal<Truck[]>([]);
  drivers = signal<User[]>([]);
  orders = signal<SalesOrder[]>([]);
  preview = signal<ShippingPreviewResult | null>(null);

  loadingCatalogs = signal(false);
  loadingOrders = signal(false);
  previewing = signal(false);
  creating = signal(false);

  selectedOrderIds = new Set<string>();
  orderSearch = '';
  orderPage = 1;
  orderTotalPages = 1;
  orderTotal = 0;

  constructor(
    private fb: FormBuilder,
    private warehouseService: WarehouseService,
    private truckService: TruckService,
    private userService: UserService,
    private salesOrderService: SalesOrderService,
    private shippingService: ShippingService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<CreateShippingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreateShippingDialogData
  ) {
    const today = this.toLocalDateString(new Date());
    this.form = this.fb.group({
      origin_warehouse_id: ['', Validators.required],
      shipping_date: [data?.shippingDate || today, Validators.required],
      driver_id: ['', Validators.required],
      truck_id: ['', Validators.required],
      notes: [''],
    });
  }

  ngOnInit(): void {
    this.loadCatalogs();
    this.form.get('origin_warehouse_id')?.valueChanges.subscribe(() => {
      this.selectedOrderIds = new Set();
      this.orderPage = 1;
      this.loadOrders();
    });
  }

  private toLocalDateString(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  private loadCatalogs(): void {
    this.loadingCatalogs.set(true);
    this.warehouseService.getWarehouses({ status: 'active', limit: 100 }).subscribe({
      next: (res) => this.warehouses.set(res.data ?? []),
      error: () => this.warehouses.set([]),
    });
    this.truckService.getTrucks({ status: 'active', limit: 100 }).subscribe({
      next: (res) => this.trucks.set(res.data ?? []),
      error: () => this.trucks.set([]),
    });
    this.userService.getUsers().subscribe({
      next: (users) => {
        const active = users.filter((u) => {
          const status =
            typeof u.status === 'string'
              ? u.status
              : (u.status as any)?.name || (u.status as any)?.code || '';
          return String(status).toLowerCase() !== 'inactive';
        });
        this.drivers.set(active);
        this.loadingCatalogs.set(false);
      },
      error: () => {
        this.drivers.set([]);
        this.loadingCatalogs.set(false);
      },
    });
  }

  loadOrders(): void {
    const warehouseId = this.form.get('origin_warehouse_id')?.value;
    if (!warehouseId) {
      this.orders.set([]);
      this.orderTotal = 0;
      this.orderTotalPages = 1;
      return;
    }
    this.loadingOrders.set(true);
    this.salesOrderService
      .getOrders(
        {
          search: this.orderSearch || undefined,
          general_status: ['Surtida', 'Lista para entrega'],
          warehouse_id: warehouseId,
        },
        { page: this.orderPage, limit: 20 }
      )
      .subscribe({
        next: (res) => {
          this.orders.set(res.data ?? []);
          this.orderTotalPages = Math.max(1, res.totalPages || 1);
          this.orderTotal = res.total ?? res.data?.length ?? 0;
          this.loadingOrders.set(false);
        },
        error: () => {
          this.orders.set([]);
          this.orderTotal = 0;
          this.loadingOrders.set(false);
        },
      });
  }

  onOrderSearch(term: string): void {
    this.orderSearch = term;
    this.orderPage = 1;
    this.loadOrders();
  }

  toggleOrder(id: string): void {
    if (this.selectedOrderIds.has(id)) this.selectedOrderIds.delete(id);
    else this.selectedOrderIds.add(id);
    this.selectedOrderIds = new Set(this.selectedOrderIds);
  }

  isSelected(id: string): boolean {
    return this.selectedOrderIds.has(id);
  }

  driverLabel(user: User): string {
    const name = [user.first_name, user.last_name].filter(Boolean).join(' ').trim();
    return name || user.email;
  }

  orderLabel(order: SalesOrder): string {
    const folio = order.folio || order.id.slice(0, 8);
    const company = order.customer?.company_name?.trim() || '';
    const person = [order.customer?.name, order.customer?.lastname]
      .filter(Boolean)
      .join(' ')
      .trim();
    let customer = '';
    if (company && person) customer = `${company} - ${person}`;
    else if (company) customer = company;
    else if (person) customer = person;
    else customer = order.customer_display_name || order.customer_summary?.display_name || 'Cliente';
    return `#${folio} · ${customer}`;
  }

  close(): void {
    this.dialogRef.close();
  }

  backToForm(): void {
    this.step.set('form');
  }

  /** Hint inicial; el back reordena por distancia. */
  private buildOrdersPayloadFromSelection(): ShippingOrderInput[] {
    return Array.from(this.selectedOrderIds).map((sales_order_id, index) => ({
      sales_order_id,
      stop_sequence: index + 1,
    }));
  }

  /** Usa orden y customer_address_id del preview enriquecido. */
  private buildOrdersPayloadFromPreview(): ShippingOrderInput[] {
    const orders = this.preview()?.orders ?? [];
    if (!orders.length) return this.buildOrdersPayloadFromSelection();
    return orders.map((o, index) => {
      const item: ShippingOrderInput = {
        sales_order_id: o.sales_order_id,
        stop_sequence: o.stop_sequence ?? index + 1,
      };
      if (o.customer_address_id != null && o.customer_address_id !== '') {
        item.customer_address_id = o.customer_address_id;
      }
      return item;
    });
  }

  runPreview(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    if (!this.selectedOrderIds.size) {
      this.snackBar.openFromComponent(CustomSnackbarComponent, {
        data: { message: 'Selecciona al menos una orden surtida', type: 'error' },
        duration: 4000,
      });
      return;
    }
    this.fetchPreview(true);
  }

  /** Re-llama preview sin validar de nuevo el form (tras editar GPS). */
  refreshPreview(): void {
    this.fetchPreview(false);
  }

  private fetchPreview(switchToPreviewStep: boolean): void {
    const value = this.form.getRawValue();
    this.previewing.set(true);
    this.shippingService
      .preview({
        shipping_date: value.shipping_date,
        driver_id: value.driver_id,
        truck_id: value.truck_id,
        origin_warehouse_id: value.origin_warehouse_id,
        orders: this.buildOrdersPayloadFromSelection(),
      })
      .subscribe({
        next: (res) => {
          this.previewing.set(false);
          const data = this.normalizePreview(res.data);
          this.preview.set(data);
          if (switchToPreviewStep) this.step.set('preview');
        },
        error: (err) => {
          this.previewing.set(false);
          const message = Array.isArray(err?.error?.message)
            ? err.error.message.join(', ')
            : err?.error?.message || 'No se pudo estimar el envío';
          this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: { message, type: 'error' },
            duration: 6000,
          });
        },
      });
  }

  private normalizePreview(data: ShippingPreviewResult): ShippingPreviewResult {
    const orders = (data.orders ?? []).map((o) => ({
      ...o,
      delivery_latitude: o.delivery_latitude ?? o.latitude,
      delivery_longitude: o.delivery_longitude ?? o.longitude,
    }));
    const missingStops = orders.filter((o) => o.location_status === 'without_location').length;
    const originMissing =
      data.origin_missing_location === true ||
      data.origin?.location_status === 'without_location';
    return {
      ...data,
      orders,
      missing_location_count: data.missing_location_count ?? missingStops + (originMissing ? 1 : 0),
      origin_missing_location: originMissing,
    };
  }

  originLabel(origin?: ShippingOrigin | null): string {
    return origin?.name || origin?.warehouse_name || 'CEDIS origen';
  }

  isOriginMissing(): boolean {
    const p = this.preview();
    return !!p?.origin_missing_location || p?.origin?.location_status === 'without_location';
  }

  stopNeedsAddress(order: ShippingPreviewOrder): boolean {
    return order.location_status === 'without_location' && !order.customer_address_id;
  }

  stopNeedsGps(order: ShippingPreviewOrder): boolean {
    return order.location_status === 'without_location' && !!order.customer_address_id;
  }

  formatKm(km: number | null | undefined): string {
    return typeof km === 'number' && !Number.isNaN(km) ? `${km.toFixed(1)} km` : '—';
  }

  selectedDriverName(): string {
    const id = this.form.get('driver_id')?.value;
    const user = this.drivers().find((d) => d.id === id);
    return user ? this.driverLabel(user) : '—';
  }

  selectedTruckName(): string {
    const id = this.form.get('truck_id')?.value;
    const truck = this.trucks().find((t) => t.id === id);
    return truck ? truckSelectLabel(truck) : '—';
  }

  routePoints(): ShippingRoutePoint[] {
    return this.preview()?.route_points ?? [];
  }

  openEditOrigin(): void {
    const warehouseId =
      this.preview()?.origin?.warehouse_id || this.form.get('origin_warehouse_id')?.value;
    if (!warehouseId) return;
    const ref = this.dialog.open(WarehouseLocationDialogComponent, {
      width: '960px',
      maxWidth: '96vw',
      data: {
        warehouseId,
        warehouseName: this.originLabel(this.preview()?.origin),
      },
    });
    ref.afterClosed().subscribe((ok) => {
      if (ok) this.refreshPreview();
    });
  }

  openAddCustomerAddress(order: ShippingPreviewOrder): void {
    const customerId = order.customer_id;
    if (customerId == null) return;
    const ref = this.dialog.open(CustomerAddressDialogComponent, {
      width: '720px',
      maxWidth: '95vw',
      data: {
        customerId: String(customerId),
        address: null,
        defaultType: 'shipping',
      },
    });
    ref.afterClosed().subscribe((ok) => {
      if (ok) this.refreshPreview();
    });
  }

  openEditCustomerAddress(order: ShippingPreviewOrder): void {
    const customerId = order.customer_id;
    if (customerId == null || order.customer_address_id == null) return;
    const ref = this.dialog.open(CustomerAddressDialogComponent, {
      width: '720px',
      maxWidth: '95vw',
      data: {
        customerId: String(customerId),
        defaultType: 'shipping',
        address: {
          id: String(order.customer_address_id),
          customer_id: String(customerId),
          type: order.address_type || 'shipping',
          street_address: order.address_summary || '',
          city: '',
          state: '',
          postal_code: '',
          country: 'México',
          latitude: order.delivery_latitude ?? order.latitude,
          longitude: order.delivery_longitude ?? order.longitude,
        },
      },
    });
    ref.afterClosed().subscribe((ok) => {
      if (ok) this.refreshPreview();
    });
  }

  create(): void {
    const preview = this.preview();
    const missing = preview?.missing_location_count ?? 0;
    const originMissing = this.isOriginMissing();
    if (missing > 0 || originMissing) {
      const ref = this.dialog.open(ConfirmDialogComponent, {
        width: '440px',
        data: {
          title: 'Ubicaciones incompletas',
          message:
            'Hay paradas o CEDIS sin GPS; la distancia será parcial. ¿Crear de todos modos?',
          confirmText: 'Crear envío',
          cancelText: 'Volver',
        },
      });
      ref.afterClosed().subscribe((ok) => {
        if (ok) this.doCreate();
      });
      return;
    }
    this.doCreate();
  }

  private doCreate(): void {
    const value = this.form.getRawValue();
    const body: CreateShippingDto = {
      shipping_date: value.shipping_date,
      driver_id: value.driver_id,
      truck_id: value.truck_id,
      origin_warehouse_id: value.origin_warehouse_id,
      notes: value.notes?.trim() || undefined,
      orders: this.buildOrdersPayloadFromPreview(),
    };
    this.creating.set(true);
    this.shippingService.createShipping(body).subscribe({
      next: (res) => {
        this.creating.set(false);
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message: res.message || 'Envío creado', type: 'success' },
          duration: 4000,
        });
        this.dialogRef.close({ created: true, shipping: res.shipping });
      },
      error: (err) => {
        this.creating.set(false);
        const message = Array.isArray(err?.error?.message)
          ? err.error.message.join(', ')
          : err?.error?.message || 'No se pudo crear el envío';
        this.snackBar.openFromComponent(CustomSnackbarComponent, {
          data: { message, type: 'error' },
          duration: 6000,
        });
      },
    });
  }

  prevOrderPage(): void {
    if (this.orderPage <= 1) return;
    this.orderPage -= 1;
    this.loadOrders();
  }

  nextOrderPage(): void {
    if (this.orderPage >= this.orderTotalPages) return;
    this.orderPage += 1;
    this.loadOrders();
  }

  previewOrders(): ShippingPreviewOrder[] {
    return this.preview()?.orders ?? [];
  }
}
