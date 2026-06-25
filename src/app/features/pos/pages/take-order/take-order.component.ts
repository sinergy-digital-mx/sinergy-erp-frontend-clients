import { Component, OnDestroy, OnInit, signal, computed, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from '../../../../core/services/toast.service';
import { AuthService } from '../../../../core/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import {
  LucideAngularModule,
  Search,
  Plus,
  ShoppingCart,
  Trash2,
  Minus,
  Maximize2,
  Minimize2,
  Monitor,
  Package,
  AlertCircle,
  User,
} from 'lucide-angular';
import { SellerCodeDialogComponent } from '../../components/seller-code-dialog/seller-code-dialog.component';
import { POSService } from '../../services/pos.service';
import { PosStateService } from '../../services/pos-state.service';
import { POSCartItem } from '../../models/pos.model';
import {
  enrichPosInventorySummary,
  normalizePosInventorySummary,
  persistPosWarehouseId,
  PosInventorySummaryResponse,
  PosSummaryWarehouse,
  resolvePosWarehouseId,
} from '../../models/pos-inventory-summary.model';
import { WarehouseService } from '../../../settings/services/warehouse.service';
import {
  buildVentasPosOrderPayload,
  isPosOrderQueued,
  resolveFiscalConfigurationIdFromBranch,
} from '../../utils/pos-order.util';
import { mapPosApiErrorMessage } from '../../constants/pos-api-errors';
import { dailyShiftIsOpen } from '../../models/pos-daily-shift.model';

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
  readonly Maximize2 = Maximize2;
  readonly Minimize2 = Minimize2;
  readonly Monitor = Monitor;
  readonly Package = Package;
  readonly AlertCircle = AlertCircle;
  readonly User = User;

  products = signal<any[]>([]);
  warehouses = signal<PosSummaryWarehouse[]>([]);
  filteredProducts = signal<any[]>([]);

  selectedWarehouse = signal<string>('');
  searchTerm = signal<string>('');
  loading = signal<boolean>(false);
  saving = signal<boolean>(false);

  priceListError = signal<boolean>(false);
  isFullscreen = signal<boolean>(false);

  private lastInventorySummary = signal<PosInventorySummaryResponse | null>(null);

  photoLoadingStates = signal<Map<string, boolean>>(new Map());
  photoErrorStates = signal<Map<string, boolean>>(new Map());

  private sellerDialogOpen = false;

  constructor(
    public posService: POSService,
    public posState: PosStateService,
    private warehouseService: WarehouseService,
    private authService: AuthService,
    private router: Router,
    private toast: ToastService,
    private dialog: MatDialog
  ) {}

  readonly canSell = computed(() => this.posState.canCaptureSales());

  readonly cartProductsTabLabel = computed(() => {
    const count = this.posService.cart().items.length;
    return count > 0 ? `Carrito (${count})` : 'Carrito';
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
    document.addEventListener('fullscreenchange', this.onFullscreenChange);
    if (this.authService.isPosCobranzaTerminal()) {
      void this.router.navigate(['/pos/cobranza'], { replaceUrl: true });
      return;
    }
    this.loadData();
  }

  isCobranzaTerminal(): boolean {
    return this.authService.isPosCobranzaTerminal();
  }

  ngOnDestroy(): void {
    document.removeEventListener('fullscreenchange', this.onFullscreenChange);
  }

  terminalLabel(): string {
    const email = this.authService.user_info?.email ?? '';
    return email.split('@')[0] || 'Ventas';
  }

  branchLabel(): string {
    const branch = this.posState.dailyShift()?.billing_branch;
    return branch?.display_name || branch?.code || 'Sucursal';
  }

  selectedWarehouseName(): string {
    const id = this.selectedWarehouse();
    const w = this.warehouses().find((x) => x.id === id);
    return w?.name ?? 'Almacén';
  }

  loadData(): void {
    this.refreshDailyShift();
  }

  private applyInventorySummaryMeta(summary: PosInventorySummaryResponse): void {
    const enriched = enrichPosInventorySummary(summary);
    this.lastInventorySummary.set(enriched);

    if (enriched.warehouses.length > 0) {
      this.warehouses.set(enriched.warehouses);
    }

    const warehouseId = resolvePosWarehouseId(enriched);
    if (warehouseId) {
      this.selectedWarehouse.set(warehouseId);
      persistPosWarehouseId(warehouseId);
    }
  }

  private resolveBillingBranchId(): string | null {
    return (
      this.lastInventorySummary()?.billing_branch_id?.trim() ||
      this.authService.getBillingBranchId() ||
      this.posState.dailyShift()?.billing_branch?.id?.trim() ||
      null
    );
  }

  private resolveWarehouseForSaleSync(): string {
    const current = this.selectedWarehouse()?.trim();
    if (current) {
      return current;
    }

    const summary = this.lastInventorySummary();
    if (summary) {
      const fromSummary = resolvePosWarehouseId(summary);
      if (fromSummary) {
        this.selectedWarehouse.set(fromSummary);
        persistPosWarehouseId(fromSummary);
        return fromSummary;
      }
    }

    return '';
  }

  private ensureWarehouseForSale(onReady: (warehouseId: string) => void): void {
    const resolved = this.resolveWarehouseForSaleSync();
    if (resolved) {
      onReady(resolved);
      return;
    }

    const branchId = this.resolveBillingBranchId();
    if (!branchId) {
      this.notifyError(
        'Tu usuario POS no tiene sucursal asignada. Pide al administrador que la configure.',
        6000
      );
      return;
    }

    this.warehouseService.getWarehouses({ limit: 100, status: 'active' }).subscribe({
      next: (response) => {
        const branchWarehouses = (response.data ?? []).filter(
          (warehouse) => (warehouse.billing_branch_id || '').trim() === branchId
        );
        const pick = branchWarehouses[0];
        if (!pick?.id) {
          this.notifyError(
            'No hay almacén activo para tu sucursal POS. Revisa la configuración en Ajustes.',
            6000
          );
          return;
        }

        const mapped: PosSummaryWarehouse[] = branchWarehouses.map((warehouse) => ({
          id: warehouse.id,
          name: warehouse.name,
          status: warehouse.status,
        }));
        this.warehouses.set(mapped);
        this.selectedWarehouse.set(pick.id);
        persistPosWarehouseId(pick.id);
        onReady(pick.id);
      },
      error: () => {
        this.notifyError(
          'No se pudo resolver el almacén de tu sucursal POS. Intenta de nuevo.',
          5000
        );
      },
    });
  }

  refreshDailyShift(): void {
    this.posState.checkingShift.set(true);
    this.posService.getCurrentDailyShift().subscribe({
      next: ({ daily_shift }) => {
        if (daily_shift) {
          this.posState.setDailyShift(daily_shift);
        }
        this.posState.checkingShift.set(false);
        const shift = this.posState.dailyShift();
        if (dailyShiftIsOpen(shift)) {
          this.ensureFiscalFromShift(shift!);
        }
        if (this.posState.seller()) {
          this.loadProducts();
        }
        this.maybePromptSellerCode();
      },
      error: (error) => {
        this.posState.checkingShift.set(false);
        if (!dailyShiftIsOpen(this.posState.dailyShift())) {
          this.posState.setDailyShift(null);
        }
        if (this.posState.seller()) {
          this.loadProducts();
        }
        this.maybePromptSellerCode();
        if (error?.status !== 404) {
          this.notifyError(mapPosApiErrorMessage(error.error?.message), 5000);
        }
      },
    });
  }

  private ensureFiscalFromShift(shift: NonNullable<ReturnType<typeof this.posState.dailyShift>>): void {
    if (this.posState.fiscalConfigurationId()) {
      return;
    }
    const fiscalId = resolveFiscalConfigurationIdFromBranch(shift.billing_branch);
    if (fiscalId) {
      this.posState.fiscalConfigurationId.set(String(fiscalId));
    }
  }

  private maybePromptSellerCode(): void {
    if (this.authService.isPosCobranzaTerminal()) {
      return;
    }
    if (!this.posState.needsSellerCode() || this.sellerDialogOpen) {
      return;
    }
    void this.openSellerCodeDialog();
  }

  async openSellerCodeDialog(): Promise<void> {
    if (this.sellerDialogOpen) {
      return;
    }
    this.sellerDialogOpen = true;
    await this.exitFullscreenForDialog();

    const dialogRef = this.dialog.open(SellerCodeDialogComponent, {
      width: '400px',
      maxWidth: '95vw',
      disableClose: true,
      panelClass: 'pos-dialog-panel',
    });

    dialogRef.afterClosed().subscribe((code: number | undefined) => {
      this.sellerDialogOpen = false;
      if (code == null) {
        return;
      }
      this.posService.validateSellerCode(code).subscribe({
        next: (response) => {
          if (response.daily_shift) {
            this.posState.setDailyShift(response.daily_shift);
          }
          const branch = response.terminal_user?.billing_branch;
          const fiscalId = resolveFiscalConfigurationIdFromBranch(branch);
          if (fiscalId) {
            this.posState.fiscalConfigurationId.set(String(fiscalId));
          }
          this.posState.setSeller(response.seller);
          this.notifySuccess(`Vendedor: ${this.posState.sellerDisplayName()}`, 3000);
          this.loadProducts();
        },
        error: (error) => {
          this.notifyError(mapPosApiErrorMessage(error.error?.message), 5000);
          void this.openSellerCodeDialog();
        },
      });
    });
  }

  changeSeller(): void {
    this.posState.clearSeller();
    void this.openSellerCodeDialog();
  }

  onSearchChange(): void {
    if (this.canSell()) {
      this.loadProducts(this.searchTerm());
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
    if (!this.canSell()) {
      this.notifyInfo('Ingresa el código del vendedor para agregar productos', 4000);
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
    if (!this.canSell()) {
      this.notifyError('Identifica al vendedor con su código para registrar la venta', 4000);
      void this.openSellerCodeDialog();
      return;
    }

    const cart = this.posService.cart();
    if (cart.items.length === 0) {
      this.notifyInfo('Agrega productos a la orden', 3000);
      return;
    }

    const seller = this.posState.seller();
    if (!seller?.id) {
      void this.openSellerCodeDialog();
      return;
    }

    this.ensureWarehouseForSale((warehouseId) => {
      const fiscalConfigurationId = this.posState.fiscalConfigurationId();
      if (!fiscalConfigurationId) {
        this.notifyError(
          'No hay configuración fiscal en la sucursal del POS. Revisa la sucursal en Ajustes.',
          6000
        );
        return;
      }

      const payload = buildVentasPosOrderPayload(cart.items, {
        warehouseId,
        fiscalConfigurationId,
        sellerUserId: seller.id,
        terminalLabel: this.terminalLabel(),
      });

      this.saving.set(true);

      this.posService.createPosSalesOrder(payload).subscribe({
        next: (order) => {
          this.saving.set(false);
          const folioLabel = order.folio ? order.folio : 'sin folio';
          const queued = isPosOrderQueued(order) || this.posState.salesQueueMode();
          const message = queued
            ? `Venta en cola (${folioLabel}). El cliente debe pasar a cobranza cuando abran el corte del día.`
            : `Venta registrada (${folioLabel}). El cliente debe pasar a cobranza para pagar.`;
          this.notifySuccess(message, 6000);
          this.posService.clearCart();
          this.loadProducts(this.searchTerm());
        },
        error: (error) => {
          this.saving.set(false);
          const msg = mapPosApiErrorMessage(error?.error?.message) || 'Error al crear la orden de venta';
          this.notifyError(msg, 6000);
        },
      });
    });
  }

  cancel(): void {
    if (confirm('¿Descartar orden actual?')) {
      this.posService.clearCart();
      this.router.navigate(['/pos/ventas']);
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
    if (!this.canSell()) {
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
    if (!this.posState.seller()) {
      return 'Identifica al vendedor con su código';
    }
    if (Number(product.total_available_quantity ?? 0) <= 0) {
      return 'Sin stock disponible';
    }
    if (product.suggested_unit_price == null && product.cost == null) {
      return 'Producto sin precio configurado';
    }
    return '';
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

  cartQueueHint(): string {
    if (this.posState.shiftOpen()) {
      return 'Corte activo — la venta irá directo a cobranza pendiente de pago.';
    }
    return 'Sin corte abierto — la venta quedará en cola hasta que cobranza abra el día.';
  }

  catalogEmptyMessage(): string {
    if (this.priceListError()) {
      return 'No se pudo cargar el catálogo. Revisa la sucursal y el almacén.';
    }
    if (this.searchTerm().trim()) {
      return 'No hay productos que coincidan con tu búsqueda.';
    }
    return 'No hay productos disponibles en este almacén.';
  }

  retryCatalogLoad(): void {
    this.loadProducts(this.searchTerm());
  }

  private loadProducts(search = ''): void {
    if (!this.posState.seller()) {
      return;
    }

    this.loading.set(true);
    this.posService
      .getPosInventorySummary({
        search: search.trim() || undefined,
        limit: 200,
      })
      .subscribe({
        next: (summary) => {
          this.applyInventorySummaryMeta(summary);
          const rows = summary.data ?? [];
          const normalized = (rows || []).map((row: any) => ({
            ...row,
            id: row.product_id || row.id,
            name: row.product_name || row.name || 'Producto',
            sku: row.product_sku || row.sku || '',
            primary_photo_url: row.product_photo || row.primary_photo_url || null,
            cost: Number(row.suggested_unit_price ?? row.cost ?? 0),
            has_price: row.suggested_unit_price != null || row.cost != null,
            total_available_quantity: Number(row.total_available_quantity ?? row.available_quantity ?? 0),
            pricing_options: Array.isArray(row.pricing_options) ? row.pricing_options : [],
          }));
          this.products.set(normalized);
          this.filteredProducts.set(normalized);
          if (!this.selectedWarehouse() && this.lastInventorySummary()) {
            const warehouseId = resolvePosWarehouseId(this.lastInventorySummary()!);
            if (warehouseId) {
              this.selectedWarehouse.set(warehouseId);
              persistPosWarehouseId(warehouseId);
            }
          }
          this.priceListError.set(false);
          this.loading.set(false);
        },
        error: (error) => {
          const recovery = normalizePosInventorySummary(error?.error);
          if (error?.status === 400 && recovery.warehouses.length > 0) {
            persistPosWarehouseId('');
            this.applyInventorySummaryMeta(recovery);
            this.loadProducts(search);
            return;
          }

          this.products.set([]);
          this.filteredProducts.set([]);
          this.priceListError.set(true);
          this.loading.set(false);
          this.notifyError('No se pudo cargar inventario POS', 4000);
        },
      });
  }
}
