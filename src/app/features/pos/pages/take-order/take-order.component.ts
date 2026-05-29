import { Component, OnDestroy, OnInit, signal, computed, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../../../../core/services/toast.service';
import { MatDialog } from '@angular/material/dialog';
import {
  LucideAngularModule,
  Search,
  Plus,
  ShoppingCart,
  Trash2,
  Minus,
  CreditCard,
  Banknote,
  FileText,
  Maximize2,
  Minimize2,
  LogIn,
  LogOut,
  Monitor,
  Package,
  AlertCircle,
  User,
  ChevronRight,
  X,
} from 'lucide-angular';
import {
  PosCustomerPickerDialogComponent,
  PosCustomerPickerDialogResult,
} from '../../components/pos-customer-picker-dialog/pos-customer-picker-dialog.component';
import { POSService } from '../../services/pos.service';
import { WarehouseService } from '../../../purchase-orders/services/warehouse.service';
import { CustomerService } from '../../../../core/services/customer.service';
import { Warehouse } from '../../../purchase-orders/models/warehouse.model';
import { POSCartItem } from '../../models/pos.model';
import { OpenShiftDialogComponent } from '../../components/open-shift-dialog/open-shift-dialog.component';
import { CloseShiftDialogComponent } from '../../components/close-shift-dialog/close-shift-dialog.component';
import { OpenShiftDialogResult } from '../../models/pos-session.model';
import { applyOpenShiftDialogResult, isPosSessionNotFoundError } from '../../utils/pos-session.util';
import {
  buildPosSalesOrderPayload,
  isPosOrderFulfilled,
  resolvePosFiscalConfigurationId,
} from '../../utils/pos-order.util';

@Component({
  selector: 'app-take-order',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './take-order.component.html',
  styleUrls: ['./take-order.component.scss'],
})
export class TakeOrderComponent implements OnInit, OnDestroy {
  @ViewChild('posRoot') posRootRef?: ElementRef<HTMLElement>;
  readonly Search = Search;
  readonly Plus = Plus;
  readonly ShoppingCart = ShoppingCart;
  readonly Trash2 = Trash2;
  readonly Minus = Minus;
  readonly CreditCard = CreditCard;
  readonly Banknote = Banknote;
  readonly FileText = FileText;
  readonly Maximize2 = Maximize2;
  readonly Minimize2 = Minimize2;
  readonly LogIn = LogIn;
  readonly LogOut = LogOut;
  readonly Monitor = Monitor;
  readonly Package = Package;
  readonly AlertCircle = AlertCircle;
  readonly User = User;
  readonly ChevronRight = ChevronRight;
  readonly X = X;

  products = signal<any[]>([]);
  warehouses = signal<Warehouse[]>([]);
  filteredProducts = signal<any[]>([]);

  selectedWarehouse = signal<string>('');
  searchTerm = signal<string>('');
  loading = signal<boolean>(false);
  saving = signal<boolean>(false);

  loadingPhotos = signal<boolean>(false);
  loadingPrices = signal<boolean>(false);
  priceListError = signal<boolean>(false);
  isFullscreen = signal<boolean>(false);

  photoLoadingStates = signal<Map<string, boolean>>(new Map());
  photoErrorStates = signal<Map<string, boolean>>(new Map());

  cartActiveTab = signal<'products' | 'payment'>('products');
  paymentMethod = signal<'cash' | 'card' | 'credit'>('cash');
  customers = signal<any[]>([]);
  selectedCustomerId = signal<string>('');
  /** Usa propiedad para ngModel (evita conflicto con signal). */
  amountPaid = 0;
  String = String;

  /** Código del equipo POS (configuración); se guarda al abrir sesión. */
  terminalId = signal<string>('');

  /** Turno de caja = sesión POS en API actual */
  activePosSession = signal<any | null>(null);
  checkingSession = signal(false);

  constructor(
    public posService: POSService,
    private warehouseService: WarehouseService,
    private customerService: CustomerService,
    private router: Router,
    private toast: ToastService,
    private dialog: MatDialog
  ) {}

  readonly sessionOk = computed(() => !!this.activePosSession());

  readonly cartProductsTabLabel = computed(() => {
    const count = this.posService.cart().items.length;
    return count > 0 ? `Productos (${count})` : 'Productos';
  });

  readonly cartPaymentTabLabel = computed(() => {
    const total = this.posService.cart().grand_total;
    if (total <= 0) {
      return 'Pago';
    }
    return `Pago · ${this.formatCurrency(total)}`;
  });

  readonly selectedCustomer = computed(() => {
    const id = this.selectedCustomerId();
    if (!id) {
      return null;
    }
    return this.customers().find((c) => String(c.id) === String(id)) ?? null;
  });

  private notifyError(message: string, duration = 4500): void {
    this.toast.error(message, { duration });
  }

  private notifySuccess(message: string, duration = 3000): void {
    this.toast.success(message, { duration });
  }

  private notifyInfo(message: string, duration = 3500): void {
    this.toast.info(message, { duration });
  }

  ngOnInit(): void {
    this.loadData();
    document.addEventListener('fullscreenchange', this.onFullscreenChange);
  }

  ngOnDestroy(): void {
    document.removeEventListener('fullscreenchange', this.onFullscreenChange);
  }

  selectedWarehouseName(): string {
    const id = this.selectedWarehouse();
    const w = this.warehouses().find((x) => x.id === id);
    return w?.name ?? 'Almacén';
  }

  loadData(): void {
    this.loading.set(true);
    this.priceListError.set(false);
    this.products.set([]);
    this.filteredProducts.set([]);

    this.warehouseService.getWarehouses().subscribe({
      next: (warehouses) => {
        const warehouseArray = Array.isArray(warehouses)
          ? warehouses
          : (warehouses as any).data || [];
        this.warehouses.set(warehouseArray);

        const stored = localStorage.getItem('pos_warehouse_id');
        const pick =
          stored && warehouseArray.some((w: Warehouse) => w.id === stored)
            ? stored
            : warehouseArray[0]?.id ?? '';
        this.selectedWarehouse.set(pick);
        if (pick) {
          localStorage.setItem('pos_warehouse_id', pick);
          this.refreshPosSession();
        }
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.notifyError('Error al cargar almacenes', 5000);
      },
    });

    this.loadCustomers();
  }

  private loadCustomers(search = ''): void {
    const params: Record<string, string | number> = { limit: 100 };
    if (search.trim()) {
      params['search'] = search.trim();
    }
    this.customerService.getCustomers(params).subscribe({
      next: (customers) => {
        const list = Array.isArray(customers) ? customers : (customers as any)?.data || [];
        this.customers.set(list);
      },
      error: () => {
        this.customers.set([]);
      },
    });
  }

  async openCustomerPicker(): Promise<void> {
    await this.exitFullscreenForDialog();
    const dialogRef = this.dialog.open(PosCustomerPickerDialogComponent, {
      width: '520px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      panelClass: 'pos-dialog-panel',
      data: { selectedCustomerId: this.selectedCustomerId() },
    });

    dialogRef.afterClosed().subscribe((result: PosCustomerPickerDialogResult | undefined) => {
      if (result === undefined) {
        return;
      }
      this.selectedCustomerId.set(result.customerId);
      if (result.customer) {
        const id = String(result.customer.id);
        const exists = this.customers().some((c) => String(c.id) === id);
        if (!exists) {
          this.customers.update((list) => [...list, result.customer]);
        }
      }
    });
  }

  clearCustomer(): void {
    this.selectedCustomerId.set('');
  }

  setCartTab(tab: 'products' | 'payment'): void {
    this.cartActiveTab.set(tab);
  }

  setPaymentMethod(method: 'cash' | 'card' | 'credit'): void {
    this.paymentMethod.set(method);
    this.cartActiveTab.set('payment');
    if (method === 'credit' && !this.selectedCustomerId()) {
      void this.openCustomerPicker();
    }
  }

  customerDisplayName(customer: any): string {
    if (!customer) {
      return '';
    }
    const parts = [customer.name, customer.lastname].filter(Boolean).join(' ').trim();
    if (customer.company_name) {
      return parts ? `${parts} · ${customer.company_name}` : customer.company_name;
    }
    return parts || customer.email || 'Cliente';
  }

  customerInitials(customer: any): string {
    const name = this.customerDisplayName(customer);
    const words = name.split(/\s+/).filter(Boolean);
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }

  /** Etiqueta del chip de terminal según sesión activa y valores guardados al abrir sesión. */
  private syncTerminalLabelFromSession(hasActiveSession: boolean): void {
    if (!hasActiveSession) {
      localStorage.removeItem('pos_configuration_id');
      localStorage.removeItem('pos_configuration_code');
      this.terminalId.set('');
      return;
    }
    const code = localStorage.getItem('pos_configuration_code');
    this.terminalId.set(code ?? '');
  }

  refreshPosSession(): void {
    const posConfigId = localStorage.getItem('pos_configuration_id');
    if (!posConfigId) {
      this.activePosSession.set(null);
      this.syncTerminalLabelFromSession(false);
      this.checkingSession.set(false);
      return;
    }
    this.checkingSession.set(true);
    this.posService.getActivePosSession(posConfigId).subscribe({
      next: (session) => {
        const active = session && session.id ? session : null;
        this.activePosSession.set(active);
        this.syncTerminalLabelFromSession(!!active);
        this.loadProductsForActiveSession();
        this.checkingSession.set(false);
      },
      error: (error) => {
        this.activePosSession.set(null);
        this.syncTerminalLabelFromSession(false);
        this.products.set([]);
        this.filteredProducts.set([]);
        this.checkingSession.set(false);
        if (!isPosSessionNotFoundError(error)) {
          this.notifyError('No se pudo verificar la sesión POS', 4000);
        }
      },
    });
  }

  async openPosSession(): Promise<void> {
    await this.exitFullscreenForDialog();
    const dialogRef = this.dialog.open(OpenShiftDialogComponent, {
      width: '420px',
      maxWidth: '95vw',
      disableClose: true,
      panelClass: 'pos-dialog-panel',
    });

    dialogRef.afterClosed().subscribe((result: OpenShiftDialogResult | undefined) => {
      if (!result) {
        return;
      }

      this.selectedWarehouse.set(result.warehouse_id);
      this.checkingSession.set(true);

      applyOpenShiftDialogResult(result, this.posService).subscribe({
        next: (session) => {
          this.activePosSession.set(session);
          if (result.pos_configuration_code) {
            this.terminalId.set(result.pos_configuration_code);
          } else {
            this.terminalId.set('');
          }
          this.checkingSession.set(false);
          this.loadProductsForActiveSession();
          this.notifySuccess(
            result.action === 'resume' ? 'Sesión POS reanudada' : 'Sesión POS iniciada',
            3000
          );
        },
        error: (error) => {
          this.checkingSession.set(false);
          this.notifyError(error.error?.message || 'No se pudo iniciar la sesión', 5000);
        },
      });
    });
  }

  async closePosSession(): Promise<void> {
    await this.exitFullscreenForDialog();
    const session = this.activePosSession();
    if (!session?.id) {
      return;
    }
    const dialogRef = this.dialog.open(CloseShiftDialogComponent, {
      width: '520px',
      maxWidth: '95vw',
      disableClose: true,
      data: { shift: session },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
      const { closing_balance, notes } = result;
      this.checkingSession.set(true);
      this.posService.closePosSession(session.id, { closing_balance, notes }).subscribe({
        next: () => {
          this.activePosSession.set(null);
          localStorage.removeItem('pos_configuration_id');
          localStorage.removeItem('pos_configuration_code');
          this.terminalId.set('');
          this.products.set([]);
          this.filteredProducts.set([]);
          this.checkingSession.set(false);
          this.notifySuccess('Sesión cerrada', 4000);
        },
        error: (error) => {
          this.checkingSession.set(false);
          this.notifyError(error.error?.message || 'Error al cerrar la sesión', 5000);
        },
      });
    });
  }

  sessionOpenedLabel(): string {
    const s = this.activePosSession();
    if (!s?.opened_at) {
      return '';
    }
    try {
      return new Date(s.opened_at).toLocaleString('es-MX', {
        dateStyle: 'short',
        timeStyle: 'short',
      });
    } catch {
      return '';
    }
  }

  onSearchChange(): void {
    if (this.sessionOk()) {
      this.loadProductsForActiveSession(this.searchTerm());
      return;
    }

    const term = this.searchTerm().toLowerCase();
    if (!term) {
      this.filteredProducts.set(this.products());
      return;
    }

    const filtered = this.products().filter(
      (p) =>
        p.name.toLowerCase().includes(term) || p.sku.toLowerCase().includes(term)
    );
    this.filteredProducts.set(filtered);
  }

  addProductToCart(product: any): void {
    if (!this.sessionOk()) {
      this.notifyInfo('Inicia sesión POS para agregar productos', 4000);
      return;
    }
    if (!product.has_price) {
      this.notifyError('Este producto no tiene precio configurado', 3000);
      return;
    }

    const cartItem: POSCartItem = {
      product_id: product.product_id || product.id,
      product_name: product.product_name || product.name,
      product_sku: product.product_sku || product.sku || '',
      uom_id: product.uom_id || 'default-uom',
      uom_name: product.uom_name || 'Pieza',
      quantity: 1,
      unit_price: Number(product.suggested_unit_price ?? product.cost ?? 0),
      iva_percentage: Number(product.suggested_iva_percentage ?? 16),
      ieps_percentage: Number(product.suggested_ieps_percentage ?? 0),
      subtotal: 0,
      iva_amount: 0,
      ieps_amount: 0,
      line_total: 0,
      pricing_options: Array.isArray(product.pricing_options) ? product.pricing_options : [],
      selected_price_list_id: '',
      suggested_unit_price: Number(product.suggested_unit_price ?? product.cost ?? 0),
      suggested_iva_percentage: Number(product.suggested_iva_percentage ?? 16),
      suggested_ieps_percentage: Number(product.suggested_ieps_percentage ?? 0),
    };

    const subtotal = cartItem.quantity * cartItem.unit_price;
    const iva_amount = subtotal * (cartItem.iva_percentage / 100);
    const ieps_amount = subtotal * (cartItem.ieps_percentage / 100);
    cartItem.subtotal = subtotal;
    cartItem.iva_amount = iva_amount;
    cartItem.ieps_amount = ieps_amount;
    cartItem.line_total = subtotal + iva_amount + ieps_amount;

    this.posService.addItem(cartItem);
    this.notifySuccess(`${product.product_name || product.name} agregado`, 2000);
  }

  updateQuantity(index: number, quantity: number): void {
    if (quantity <= 0) {
      this.posService.removeItem(index);
    } else {
      this.posService.updateItemQuantity(index, quantity);
    }
  }

  removeItem(index: number): void {
    this.posService.removeItem(index);
  }

  onPricingOptionChange(index: number, optionId: string): void {
    const item = this.posService.cart().items[index];
    if (!item) return;

    if (!optionId) {
      this.posService.updateItemPricing(index, {
        unit_price: Number(item.suggested_unit_price ?? item.unit_price ?? 0),
        iva_percentage: Number(item.suggested_iva_percentage ?? item.iva_percentage ?? 0),
        ieps_percentage: Number(item.suggested_ieps_percentage ?? item.ieps_percentage ?? 0),
        selected_price_list_id: '',
      });
      return;
    }

    const options = Array.isArray(item.pricing_options) ? item.pricing_options : [];
    const selected = options.find((opt) => String(opt.price_list_id) === String(optionId));
    if (!selected) return;

    this.posService.updateItemPricing(index, {
      unit_price: Number(selected.price ?? item.unit_price ?? 0),
      iva_percentage: Number(selected.iva_percentage ?? item.iva_percentage ?? 0),
      ieps_percentage: Number(selected.ieps_percentage ?? item.ieps_percentage ?? 0),
      selected_price_list_id: optionId,
    });
  }

  saveOrder(): void {
    if (!this.sessionOk()) {
      this.notifyError('Debes tener una sesión POS activa', 4000);
      return;
    }

    const session = this.activePosSession();
    const warehouseId = this.selectedWarehouse();
    if (!warehouseId) {
      this.notifyInfo('Selecciona un almacén de la sucursal', 3000);
      return;
    }

    const fiscalConfigurationId = resolvePosFiscalConfigurationId(session);
    if (!fiscalConfigurationId) {
      this.setCartTab('payment');
      this.notifyError(
        'No hay configuración fiscal en la sucursal del POS. Revisa la sucursal en Ajustes.',
        6000
      );
      return;
    }

    const cart = this.posService.cart();
    if (cart.items.length === 0) {
      this.notifyInfo('Agrega productos a la orden', 3000);
      return;
    }

    const customerId = this.selectedCustomerId();
    if (!customerId) {
      this.setCartTab('payment');
      this.notifyInfo('Selecciona un cliente para registrar la venta', 3500);
      return;
    }

    if (this.paymentMethod() === 'credit' && !customerId) {
      this.setCartTab('payment');
      this.notifyInfo('Selecciona un cliente para venta a crédito', 3500);
      return;
    }

    if (this.paymentMethod() === 'cash' && !this.isPaymentValid()) {
      this.setCartTab('payment');
      this.notifyInfo('Cantidad recibida insuficiente para el total', 3500);
      return;
    }

    const customer = this.selectedCustomer();
    const payload = buildPosSalesOrderPayload(cart.items, {
      session: session!,
      warehouseId,
      fiscalConfigurationId,
      customerId: Number(customerId) || customerId,
      fiscalRazonSocial: customer ? this.customerDisplayName(customer) : undefined,
      terminalLabel: this.terminalId() || undefined,
      paymentMethod: this.paymentMethod(),
    });

    this.saving.set(true);

    this.posService.createPosSalesOrder(payload).subscribe({
      next: (order) => {
        this.saving.set(false);
        if (!isPosOrderFulfilled(order)) {
          this.notifyError(
            `Orden ${order.folio || order.id} creada con estado ${order.general_status || order.status || 'desconocido'}`,
            6000
          );
          return;
        }
        const folio = order.folio ? ` (${order.folio})` : '';
        this.notifySuccess(`Venta registrada${folio} — inventario surtido`, 4000);
        this.posService.clearCart();
        this.amountPaid = 0;
        this.selectedCustomerId.set('');
        this.cartActiveTab.set('products');
        this.refreshPosSession();
      },
      error: (error) => {
        this.saving.set(false);
        this.setCartTab('payment');
        const msg =
          error?.error?.message || error?.message || 'Error al crear la orden de venta';
        this.notifyError(msg, 6000);
      },
    });
  }

  cancel(): void {
    if (confirm('¿Descartar orden actual?')) {
      this.posService.clearCart();
      this.amountPaid = 0;
      this.router.navigate(['/pos']);
    }
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
    }).format(amount);
  }

  getProductPhotoUrl(product: any): string {
    if (product.primary_photo_url) {
      return product.primary_photo_url;
    }
    return '';
  }

  hasProductPhoto(product: any): boolean {
    return !!product.primary_photo_url && !this.hasPhotoError(product.id);
  }

  isPhotoLoading(productId: string): boolean {
    return this.photoLoadingStates().get(productId) || false;
  }

  hasPhotoError(productId: string): boolean {
    return this.photoErrorStates().get(productId) || false;
  }

  onPhotoError(productId: string): void {
    const errorStates = new Map(this.photoErrorStates());
    errorStates.set(productId, true);
    this.photoErrorStates.set(errorStates);
  }

  onPhotoLoad(productId: string): void {
    const loadingStates = new Map(this.photoLoadingStates());
    loadingStates.set(productId, false);
    this.photoLoadingStates.set(loadingStates);
  }

  canAddToCart(product: any): boolean {
    if (!this.sessionOk()) {
      return false;
    }
    if (this.priceListError()) {
      return false;
    }
    const stock = Number(product.total_available_quantity ?? 0);
    const hasPrice = product.suggested_unit_price != null || product.cost != null;
    return stock > 0 && hasPrice;
  }

  getDisabledTooltip(product: any): string {
    if (!this.sessionOk()) {
      return 'Inicia sesión POS para vender';
    }
    if (Number(product.total_available_quantity ?? 0) <= 0) {
      return 'Sin stock disponible';
    }
    if (product.suggested_unit_price == null && product.cost == null) {
      return 'Producto sin precio configurado';
    }
    return '';
  }

  calculateChange(): number {
    const total = this.posService.cart().grand_total;
    const paid = this.amountPaid;
    return paid > total ? paid - total : 0;
  }

  isPaymentValid(): boolean {
    if (this.paymentMethod() === 'cash') {
      return this.amountPaid >= this.posService.cart().grand_total;
    }
    return true;
  }

  onAmountPaidChange(value: number | string): void {
    const n = typeof value === 'string' ? parseFloat(value) : value;
    this.amountPaid = Number.isFinite(n) ? n : 0;
  }

  async toggleFullscreen(): Promise<void> {
    const root = this.posRootRef?.nativeElement;
    if (!root) return;
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await root.requestFullscreen();
      }
    } catch {
      this.notifyError('No se pudo cambiar a pantalla completa', 2500);
    }
  }

  private onFullscreenChange = (): void => {
    this.isFullscreen.set(!!document.fullscreenElement);
  };

  private async exitFullscreenForDialog(): Promise<void> {
    if (!document.fullscreenElement) return;
    try {
      await document.exitFullscreen();
      this.isFullscreen.set(false);
    } catch {
      // Ignore; dialog can still attempt to open.
    }
  }

  private loadProductsForActiveSession(search = ''): void {
    const sessionId = this.activePosSession()?.id;
    if (!sessionId) {
      this.products.set([]);
      this.filteredProducts.set([]);
      return;
    }

    this.loading.set(true);
    this.posService
      .getPosSessionInventorySummary(sessionId, {
        search: search.trim() || undefined,
        warehouse_id: this.selectedWarehouse() || undefined,
        only_available: true,
        limit: 200,
      })
      .subscribe({
      next: (rows) => {
        const normalized = (rows || []).map((row: any) => ({
          ...row,
          id: row.product_id || row.id,
          name: row.product_name || row.name || 'Producto',
          sku: row.product_sku || row.sku || '',
          primary_photo_url: row.product_photo || row.primary_photo_url || null,
          cost: Number(row.suggested_unit_price ?? row.cost ?? 0),
          has_price: row.suggested_unit_price != null || row.cost != null,
          total_available_quantity: Number(row.total_available_quantity ?? 0),
          pricing_options: Array.isArray(row.pricing_options) ? row.pricing_options : [],
        }));
        this.products.set(normalized);
        this.filteredProducts.set(normalized);
        this.priceListError.set(false);
        this.loading.set(false);
      },
      error: () => {
        this.products.set([]);
        this.filteredProducts.set([]);
        this.priceListError.set(true);
        this.loading.set(false);
        this.notifyError('No se pudo cargar inventario POS de la sesión', 4000);
      }
    });
  }
}
