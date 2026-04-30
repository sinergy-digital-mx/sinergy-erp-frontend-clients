import { Component, OnDestroy, OnInit, signal, computed, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
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
} from 'lucide-angular';
import { POSService } from '../../services/pos.service';
import { WarehouseService } from '../../../purchase-orders/services/warehouse.service';
import { CustomerService } from '../../../../core/services/customer.service';
import { Warehouse } from '../../../purchase-orders/models/warehouse.model';
import { POSCartItem } from '../../models/pos.model';
import { OpenShiftDialogComponent } from '../../components/open-shift-dialog/open-shift-dialog.component';
import { CloseShiftDialogComponent } from '../../components/close-shift-dialog/close-shift-dialog.component';

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

  paymentMethod = signal<'cash' | 'card' | 'credit'>('cash');
  customers = signal<any[]>([]);
  selectedCustomerId = signal<string>('');
  /** Usa propiedad para ngModel (evita conflicto con signal). */
  amountPaid = 0;

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
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  readonly sessionOk = computed(() => !!this.activePosSession());

  private notifyError(message: string, duration = 4500): void {
    this.snackBar.open(message, 'Cerrar', {
      duration,
      panelClass: ['snackbar-error'],
    });
  }

  private notifySuccess(message: string, duration = 3000): void {
    this.snackBar.open(message, 'Cerrar', {
      duration,
      panelClass: ['snackbar-success'],
    });
  }

  private notifyInfo(message: string, duration = 3500): void {
    this.snackBar.open(message, 'Cerrar', {
      duration,
      panelClass: ['snackbar-info'],
    });
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

    this.customerService.getCustomers({ limit: 100 }).subscribe({
      next: (customers) => {
        const list = Array.isArray(customers) ? customers : (customers as any)?.data || [];
        this.customers.set(list);
      },
      error: () => {
        this.customers.set([]);
      }
    });
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
      error: () => {
        this.activePosSession.set(null);
        this.syncTerminalLabelFromSession(false);
        this.products.set([]);
        this.filteredProducts.set([]);
        this.checkingSession.set(false);
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

    dialogRef.afterClosed().subscribe((result) => {
      if (!result) {
        return;
      }
      const {
        warehouse_id,
        opening_balance,
        notes,
        pos_configuration_id,
        pos_configuration_code,
      } = result;
      this.selectedWarehouse.set(warehouse_id);
      localStorage.setItem('pos_warehouse_id', warehouse_id);
      this.checkingSession.set(true);
      this.posService
        .openPosSession({
          warehouse_id,
          cashier_id: '',
          opening_balance,
          ...(notes?.trim() ? { notes: notes.trim() } : {}),
          ...(pos_configuration_id ? { pos_configuration_id } : {}),
        })
        .subscribe({
          next: (session) => {
            this.activePosSession.set(session);
            if (pos_configuration_id) {
              localStorage.setItem('pos_configuration_id', pos_configuration_id);
            } else {
              localStorage.removeItem('pos_configuration_id');
            }
            if (pos_configuration_code) {
              localStorage.setItem('pos_configuration_code', pos_configuration_code);
              this.terminalId.set(pos_configuration_code);
            } else {
              localStorage.removeItem('pos_configuration_code');
              this.terminalId.set('');
            }
            this.checkingSession.set(false);
            this.loadProductsForActiveSession();
            this.notifySuccess('Sesión POS iniciada', 3000);
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
    if (!this.selectedWarehouse()) {
      this.notifyInfo('Selecciona un almacén', 3000);
      return;
    }

    const cart = this.posService.cart();
    if (cart.items.length === 0) {
      this.notifyInfo('Agrega productos a la orden', 3000);
      return;
    }

    if (this.paymentMethod() === 'credit' && !this.selectedCustomerId()) {
      this.notifyInfo('Selecciona un cliente para venta a crédito', 3500);
      return;
    }

    this.saving.set(true);

    const orderData = {
      warehouse_id: this.selectedWarehouse(),
      ...(this.paymentMethod() === 'credit' ? { customer_id: Number(this.selectedCustomerId()) || this.selectedCustomerId() } : {}),
      line_items: cart.items.map((item) => ({
        product_id: item.product_id,
        uom_id: item.uom_id,
        quantity: item.quantity,
        discount_percentage: 0,
      })),
    };

    this.posService.createOrder(orderData).subscribe({
      next: () => {
        this.notifySuccess('Orden creada exitosamente', 3000);
        this.posService.clearCart();
        this.amountPaid = 0;
        this.router.navigate(['/pos']);
      },
      error: (error) => {
        this.notifyError(error.message || 'Error al crear orden', 5000);
        this.saving.set(false);
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

  private loadProductsForActiveSession(): void {
    const sessionId = this.activePosSession()?.id;
    if (!sessionId) {
      this.products.set([]);
      this.filteredProducts.set([]);
      return;
    }

    this.loading.set(true);
    this.posService.getPosSessionInventorySummary(sessionId).subscribe({
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
