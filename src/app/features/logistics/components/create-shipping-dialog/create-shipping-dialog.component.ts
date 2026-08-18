import { Component, Inject, OnDestroy, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LucideAngularModule, X } from 'lucide-angular';
import { Subject, takeUntil } from 'rxjs';
import { ButtonComponent } from '../../../../core/components/button/button.component';
import { SearchComponent } from '../../../../core/components/search/search.component';
import { CustomSnackbarComponent } from '../../../../core/components/custom-snackbar/custom-snackbar.component';
import { ConfirmDialogComponent } from '../../../rbac-tenant-ui/components/confirm-dialog/confirm-dialog.component';
import { UserService } from '../../../rbac-tenant-ui/services/user.service';
import { User } from '../../../rbac-tenant-ui/models';
import { FiscalConfigurationService } from '../../../settings/services/fiscal-configuration.service';
import { BranchService } from '../../../settings/services/branch.service';
import { FiscalConfiguration } from '../../../settings/models/fiscal-configuration.model';
import { Branch } from '../../../settings/models/branch.model';
import { SalesOrder } from '../../../sales-orders/models/sales-order.model';
import {
  getSalesOrderListBranchLabel,
  getSalesOrderListCustomerName,
  getSalesOrderListFiscalLabel,
  getSalesOrderStatus,
  getSalesOrderTotal,
} from '../../../sales-orders/utils/sales-order-display.util';
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
import { BranchLocationDialogComponent } from '../branch-location-dialog/branch-location-dialog.component';

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
export class CreateShippingDialogComponent implements OnInit, OnDestroy {
  readonly X = X;
  readonly truckSelectLabel = truckSelectLabel;

  form: FormGroup;
  step = signal<WizardStep>('form');
  fiscalConfigurations = signal<FiscalConfiguration[]>([]);
  branches = signal<Branch[]>([]);
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

  private destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private fiscalConfigurationService: FiscalConfigurationService,
    private branchService: BranchService,
    private truckService: TruckService,
    private userService: UserService,
    private shippingService: ShippingService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    public dialogRef: MatDialogRef<CreateShippingDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreateShippingDialogData
  ) {
    const today = this.toLocalDateString(new Date());
    this.form = this.fb.group({
      fiscal_configuration_id: ['', Validators.required],
      billing_branch_id: [{ value: '', disabled: true }, Validators.required],
      shipping_date: [data?.shippingDate || today, Validators.required],
      truck_id: ['', Validators.required],
      driver_id: ['', Validators.required],
      notes: [''],
    });
  }

  ngOnInit(): void {
    this.loadCatalogs();
    this.form
      .get('fiscal_configuration_id')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe((fiscalId) => this.onFiscalChange(fiscalId));
    this.form
      .get('billing_branch_id')
      ?.valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe(() => this.onBranchChange());
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private toLocalDateString(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  private onFiscalChange(fiscalId: string | null): void {
    this.form.patchValue({ billing_branch_id: '' }, { emitEvent: false });
    this.branches.set([]);
    this.clearOrderSelection();
    this.orders.set([]);
    this.orderTotal = 0;
    this.orderTotalPages = 1;

    if (fiscalId) {
      this.form.get('billing_branch_id')?.enable({ emitEvent: false });
      this.loadBranches(fiscalId);
    } else {
      this.form.get('billing_branch_id')?.disable({ emitEvent: false });
    }
  }

  private onBranchChange(): void {
    this.clearOrderSelection();
    this.orderPage = 1;
    this.loadOrders();
  }

  private clearOrderSelection(): void {
    this.selectedOrderIds = new Set();
  }

  private loadCatalogs(): void {
    this.loadingCatalogs.set(true);
    this.fiscalConfigurationService
      .listFiscalConfigurations({ status: 'active', limit: 100 })
      .subscribe({
        next: (res) => this.fiscalConfigurations.set(Array.isArray(res) ? res : (res.data ?? [])),
        error: () => this.fiscalConfigurations.set([]),
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

  private loadBranches(fiscalConfigId: string): void {
    this.branchService.getBranches(fiscalConfigId).subscribe({
      next: (branches) => this.branches.set(Array.isArray(branches) ? branches : []),
      error: () => this.branches.set([]),
    });
  }

  loadOrders(): void {
    const billingBranchId = this.form.get('billing_branch_id')?.value;
    const fiscalConfigurationId = this.form.get('fiscal_configuration_id')?.value;
    if (!billingBranchId) {
      this.orders.set([]);
      this.orderTotal = 0;
      this.orderTotalPages = 1;
      return;
    }
    this.loadingOrders.set(true);
    this.shippingService
      .getAvailableOrders({
        billing_branch_id: billingBranchId,
        fiscal_configuration_id: fiscalConfigurationId || undefined,
        search: this.orderSearch || undefined,
        page: this.orderPage,
        limit: 50,
      })
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

  fiscalLabel(fc: FiscalConfiguration): string {
    return fc.razon_social?.trim() || 'Sin razón social';
  }

  branchLabel(branch: Branch): string {
    return branch.name?.trim() || branch.code?.trim() || branch.display_name?.trim() || '—';
  }

  driverLabel(user: User): string {
    const name = [user.first_name, user.last_name].filter(Boolean).join(' ').trim();
    return name || user.email;
  }

  orderFolio(order: SalesOrder): string {
    return order.folio || order.id.slice(0, 8);
  }

  orderCustomer(order: SalesOrder): string {
    const nested = getSalesOrderListCustomerName(order, '');
    if (nested && nested !== 'N/A') return nested;
    const raw = String((order as SalesOrder & { customer_name?: string }).customer_name || '').trim();
    return raw || 'Cliente';
  }

  orderFiscal(order: SalesOrder): string {
    return getSalesOrderListFiscalLabel(order);
  }

  orderBranch(order: SalesOrder): string {
    const fromUtil = getSalesOrderListBranchLabel(order);
    if (fromUtil !== '—') return fromUtil;
    return (
      order.billing_branch?.display_name?.trim() ||
      order.billing_branch?.code?.trim() ||
      '—'
    );
  }

  orderStatus(order: SalesOrder): string {
    return String(getSalesOrderStatus(order) || '—');
  }

  orderTotalLabel(order: SalesOrder): string {
    return new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(
      getSalesOrderTotal(order)
    );
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
        data: { message: 'Selecciona al menos una orden', type: 'error' },
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
        billing_branch_id: value.billing_branch_id,
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
    return origin?.name || origin?.warehouse_name || 'Sucursal';
  }

  originLetter(origin?: ShippingOrigin | null): string {
    return origin?.label || 'A';
  }

  stopLetter(order: ShippingPreviewOrder, index: number): string {
    return order.label || String.fromCharCode(66 + index);
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
    const origin = this.preview()?.origin;
    const fiscalConfigId =
      origin?.fiscal_configuration_id || this.form.get('fiscal_configuration_id')?.value;
    const branchId = origin?.billing_branch_id || this.form.get('billing_branch_id')?.value;
    if (!fiscalConfigId || !branchId) return;
    const ref = this.dialog.open(BranchLocationDialogComponent, {
      width: '960px',
      maxWidth: '96vw',
      data: {
        fiscalConfigId,
        branchId,
        branchName: this.originLabel(origin),
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
            'Hay paradas o sucursal sin GPS; la distancia será parcial. ¿Crear de todos modos?',
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
      billing_branch_id: value.billing_branch_id,
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
