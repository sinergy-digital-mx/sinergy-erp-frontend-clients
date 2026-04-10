import { Component, OnInit, signal, computed } from '@angular/core';
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
  LogIn,
  LogOut,
  Monitor,
  Package,
  AlertCircle,
} from 'lucide-angular';
import { POSService } from '../../services/pos.service';
import { ProductService } from '../../../purchase-orders/services/product.service';
import { WarehouseService } from '../../../purchase-orders/services/warehouse.service';
import { Product } from '../../../purchase-orders/models/product.model';
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
export class TakeOrderComponent implements OnInit {
  readonly Search = Search;
  readonly Plus = Plus;
  readonly ShoppingCart = ShoppingCart;
  readonly Trash2 = Trash2;
  readonly Minus = Minus;
  readonly CreditCard = CreditCard;
  readonly Banknote = Banknote;
  readonly FileText = FileText;
  readonly LogIn = LogIn;
  readonly LogOut = LogOut;
  readonly Monitor = Monitor;
  readonly Package = Package;
  readonly AlertCircle = AlertCircle;

  products = signal<Product[]>([]);
  warehouses = signal<Warehouse[]>([]);
  filteredProducts = signal<Product[]>([]);

  selectedWarehouse = signal<string>('');
  searchTerm = signal<string>('');
  loading = signal<boolean>(false);
  saving = signal<boolean>(false);

  loadingPhotos = signal<boolean>(false);
  loadingPrices = signal<boolean>(false);
  priceListError = signal<boolean>(false);

  photoLoadingStates = signal<Map<string, boolean>>(new Map());
  photoErrorStates = signal<Map<string, boolean>>(new Map());

  paymentMethod = signal<'cash' | 'card' | 'credit'>('cash');
  /** Usa propiedad para ngModel (evita conflicto con signal). */
  amountPaid = 0;

  /** Código del equipo POS (configuración); se guarda al abrir sesión. */
  terminalId = signal<string>('');

  /** Turno de caja = sesión POS en API actual */
  activePosSession = signal<any | null>(null);
  checkingSession = signal(false);

  constructor(
    public posService: POSService,
    private productService: ProductService,
    private warehouseService: WarehouseService,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  readonly sessionOk = computed(() => !!this.activePosSession());

  ngOnInit(): void {
    this.loadData();
  }

  selectedWarehouseName(): string {
    const id = this.selectedWarehouse();
    const w = this.warehouses().find((x) => x.id === id);
    return w?.name ?? 'Almacén';
  }

  loadData(): void {
    this.loading.set(true);
    this.priceListError.set(false);

    this.productService.getProducts().subscribe({
      next: (products) => {
        const productArray = Array.isArray(products)
          ? products
          : (products as any).data || [];

        const productsWithPrices = productArray.map((p: Product) => ({
          ...p,
          cost: Math.round((Math.random() * (41.6 - 33.5) + 33.5) * 100) / 100,
          has_price: true,
        }));

        this.products.set(productsWithPrices);
        this.filteredProducts.set(productsWithPrices);
        this.loading.set(false);
      },
      error: () => {
        this.loading.set(false);
        this.snackBar.open('Error al cargar productos', 'Cerrar', { duration: 5000 });
      },
    });

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
      },
      error: () => {
        this.snackBar.open('Error al cargar almacenes', 'Cerrar', { duration: 5000 });
      },
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
    const wid = this.selectedWarehouse();
    if (!wid) {
      this.activePosSession.set(null);
      this.syncTerminalLabelFromSession(false);
      this.checkingSession.set(false);
      return;
    }
    this.checkingSession.set(true);
    this.posService.getActivePosSession(wid).subscribe({
      next: (session) => {
        const active = session && session.id ? session : null;
        this.activePosSession.set(active);
        this.syncTerminalLabelFromSession(!!active);
        this.checkingSession.set(false);
      },
      error: () => {
        this.activePosSession.set(null);
        this.syncTerminalLabelFromSession(false);
        this.checkingSession.set(false);
      },
    });
  }

  openPosSession(): void {
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
            this.snackBar.open('Sesión POS iniciada', 'Cerrar', { duration: 3000 });
          },
          error: (error) => {
            this.checkingSession.set(false);
            this.snackBar.open(
              error.error?.message || 'No se pudo iniciar la sesión',
              'Cerrar',
              { duration: 5000 }
            );
          },
        });
    });
  }

  closePosSession(): void {
    const session = this.activePosSession();
    if (!session?.id) {
      return;
    }
    const dialogRef = this.dialog.open(CloseShiftDialogComponent, {
      width: '640px',
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
          this.checkingSession.set(false);
          this.snackBar.open('Sesión cerrada', 'Cerrar', { duration: 4000 });
        },
        error: (error) => {
          this.checkingSession.set(false);
          this.snackBar.open(
            error.error?.message || 'Error al cerrar la sesión',
            'Cerrar',
            { duration: 5000 }
          );
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

  addProductToCart(product: Product): void {
    if (!this.sessionOk()) {
      this.snackBar.open('Inicia sesión POS para agregar productos', 'Cerrar', {
        duration: 4000,
      });
      return;
    }
    if (!product.has_price) {
      this.snackBar.open('Este producto no tiene precio configurado', 'Cerrar', {
        duration: 3000,
      });
      return;
    }

    let baseUom: any = { id: 'default-uom', name: 'Pieza' };

    if (product.uoms && product.uoms.length > 0) {
      baseUom =
        product.uoms.find((u) => u.id === product.base_uom_id) || product.uoms[0];
    }

    const cartItem: POSCartItem = {
      product_id: product.id,
      product_name: product.name,
      product_sku: product.sku,
      uom_id: baseUom.id,
      uom_name: baseUom.name || 'Pieza',
      quantity: 1,
      unit_price: product.cost || 0,
      iva_percentage: 16,
      ieps_percentage: 0,
      subtotal: 0,
      iva_amount: 0,
      ieps_amount: 0,
      line_total: 0,
    };

    const subtotal = cartItem.quantity * cartItem.unit_price;
    const iva_amount = subtotal * (cartItem.iva_percentage / 100);
    const ieps_amount = subtotal * (cartItem.ieps_percentage / 100);
    cartItem.subtotal = subtotal;
    cartItem.iva_amount = iva_amount;
    cartItem.ieps_amount = ieps_amount;
    cartItem.line_total = subtotal + iva_amount + ieps_amount;

    this.posService.addItem(cartItem);
    this.snackBar.open(`${product.name} agregado`, 'Cerrar', { duration: 2000 });
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

  saveOrder(): void {
    if (!this.sessionOk()) {
      this.snackBar.open('Debes tener una sesión POS activa', 'Cerrar', {
        duration: 4000,
      });
      return;
    }
    if (!this.selectedWarehouse()) {
      this.snackBar.open('Selecciona un almacén', 'Cerrar', { duration: 3000 });
      return;
    }

    const cart = this.posService.cart();
    if (cart.items.length === 0) {
      this.snackBar.open('Agrega productos a la orden', 'Cerrar', { duration: 3000 });
      return;
    }

    this.saving.set(true);

    const orderData = {
      warehouse_id: this.selectedWarehouse(),
      line_items: cart.items.map((item) => ({
        product_id: item.product_id,
        uom_id: item.uom_id,
        quantity: item.quantity,
        discount_percentage: 0,
      })),
    };

    this.posService.createOrder(orderData).subscribe({
      next: () => {
        this.snackBar.open('Orden creada exitosamente', 'Cerrar', { duration: 3000 });
        this.posService.clearCart();
        this.amountPaid = 0;
        this.router.navigate(['/pos']);
      },
      error: (error) => {
        this.snackBar.open(error.message || 'Error al crear orden', 'Cerrar', {
          duration: 5000,
        });
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

  getProductPhotoUrl(product: Product): string {
    if (product.primary_photo_url) {
      return product.primary_photo_url;
    }
    return '/images/product-placeholder.svg';
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

  canAddToCart(product: Product): boolean {
    if (!this.sessionOk()) {
      return false;
    }
    if (this.priceListError()) {
      return false;
    }
    return product.has_price === true;
  }

  getDisabledTooltip(product: Product): string {
    if (!this.sessionOk()) {
      return 'Inicia sesión POS para vender';
    }
    if (!product.has_price) {
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
}
