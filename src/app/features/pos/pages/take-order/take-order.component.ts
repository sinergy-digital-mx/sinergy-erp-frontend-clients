import { Component, OnDestroy, OnInit, signal, computed, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged, takeUntil, tap } from 'rxjs';
import { SpinnerComponent } from '../../../../core/components/spinner/spinner.component';
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
  Percent,
  Info,
  ChevronDown,
  X,
  MapPin,
} from 'lucide-angular';
import { SellerCodeDialogComponent } from '../../components/seller-code-dialog/seller-code-dialog.component';
import { PosBranchSessionService } from '../../services/pos-branch-session.service';
import { UnclosedDailyShiftDialogComponent } from '../../components/unclosed-daily-shift-dialog/unclosed-daily-shift-dialog.component';
import {
  PosCheckoutConfirmDialogComponent,
  PosCheckoutConfirmDialogData,
} from '../../components/pos-checkout-confirm-dialog/pos-checkout-confirm-dialog.component';
import { ProductDetailModalComponent } from '../../../settings/components/product-detail-modal/product-detail-modal.component';
import { PRODUCT_DETAIL_DIALOG_CONFIG } from '../../../../core/config/form-dialog.config';
import { POSService } from '../../services/pos.service';
import { PosStateService } from '../../services/pos-state.service';
import { POSCart, POSCartItem } from '../../models/pos.model';
import {
  enrichPosInventorySummary,
  normalizePosInventorySummary,
  persistPosWarehouseId,
  PosInventorySummaryResponse,
  PosApplicableDiscount,
  normalizePosPricingOptions,
  collectPosPricingOptions,
  unwrapProductPriceList,
  filterProductPricesForUom,
  PosPricingOption,
  resetPosWarehouseForBranch,
  firstPosSummaryWarehouseId,
} from '../../models/pos-inventory-summary.model';
import { ProductService } from '../../../settings/services/product.service';
import {
  buildVentasPosOrderPayload,
  isPosOrderQueued,
  resolveFiscalConfigurationIdFromBranch,
} from '../../utils/pos-order.util';
import { isDiscountApiError, formatGlobalDiscountLabel, formatApplicableDiscountLabel } from '../../utils/pos-discount.util';
import { GlobalDiscountService } from '../../../global-discounts/services/global-discount.service';
import { GlobalDiscount } from '../../../global-discounts/models/global-discount.model';
import { GLOBAL_DISCOUNT_PERMISSIONS } from '../../../global-discounts/config/permissions.config';
import { QUOTATION_PERMISSIONS } from '../../../quotations/config/permissions.config';
import { mapPosApiErrorMessage } from '../../constants/pos-api-errors';
import { resolveHttpErrorMessage } from '../../../../core/utils/http-error-message.util';
import { formatMeasureTotalsLine, hasMeasureTotals } from '../../../../core/utils/inventory-measure.util';
import { formatUnitCurrency } from '../../../../core/utils/unit-money.util';
import { formatInventoryNumber } from '../../../inventory/utils/inventory-list.util';

@Component({
  selector: 'app-take-order',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, SpinnerComponent],
  templateUrl: './take-order.component.html',
  styleUrls: ['./take-order.component.scss'],
})
export class TakeOrderComponent implements OnInit, OnDestroy {
  @ViewChild('posRoot') posRootRef?: ElementRef<HTMLElement>;
  @ViewChild('catalogSearch') catalogSearchRef?: ElementRef<HTMLInputElement>;
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
  readonly Percent = Percent;
  readonly Info = Info;
  readonly ChevronDown = ChevronDown;
  readonly X = X;
  readonly MapPin = MapPin;

  private static readonly CART_TOTALS_OPEN_KEY = 'pos_cart_totals_open';
  cartTotalsOpen = signal(TakeOrderComponent.readCartTotalsOpen());

  products = signal<any[]>([]);
  filteredProducts = signal<any[]>([]);

  searchTerm = signal<string>('');
  loading = signal<boolean>(false);
  saving = signal<boolean>(false);
  confirming = signal<boolean>(false);

  priceListError = signal<boolean>(false);
  isFullscreen = signal<boolean>(false);

  cartAppliedDiscounts = computed(() =>
    this.posService
      .cart()
      .items.filter((item) => item.line_discount_amount > 0 && item.selected_discount)
      .map((item) => ({
        productName: item.product_name,
        discountName: item.selected_discount!.name,
        amount: item.line_discount_amount,
      }))
  );

  cartHasDiscounts = computed(() => this.posService.cart().total_discount > 0);

  cartHasGlobalDiscount = computed(() => this.posService.cart().global_discount_amount > 0);

  cartHasItems = computed(() => this.posService.cart().items.length > 0);

  canUseGlobalDiscounts = computed(() =>
    GLOBAL_DISCOUNT_PERMISSIONS.viewList.some((permission) =>
      this.authService.hasPermission(permission)
    )
  );

  applicableGlobalDiscounts = signal<GlobalDiscount[]>([]);
  loadingGlobalDiscounts = signal(false);

  private lastInventorySummary = signal<PosInventorySummaryResponse | null>(null);

  photoLoadingStates = signal<Map<string, boolean>>(new Map());
  photoErrorStates = signal<Map<string, boolean>>(new Map());

  private sellerDialogOpen = false;
  private unclosedDialogOpen = false;
  private acknowledgedUnclosedIds = new Set<string>();
  private productPricingCache = new Map<string, PosPricingOption[]>();
  private readonly destroy$ = new Subject<void>();
  private readonly searchInput$ = new Subject<string>();
  private lastAppliedSearch: string | null = null;

  constructor(
    public posService: POSService,
    public posState: PosStateService,
    private authService: AuthService,
    private router: Router,
    private toast: ToastService,
    private dialog: MatDialog,
    private globalDiscountService: GlobalDiscountService,
    private productService: ProductService,
    private posBranchSession: PosBranchSessionService
  ) {}

  readonly canSell = computed(() => this.posState.canCaptureSales());
  readonly canQuote = computed(
    () =>
      this.posState.canCaptureSales() &&
      this.authService.hasPermission(QUOTATION_PERMISSIONS.create),
  );

  readonly cartProductsTabLabel = computed(() => {
    const count = this.posService.cart().items.length;
    return count > 0 ? `Carrito (${count})` : 'Carrito';
  });

  toggleCartTotals(): void {
    const next = !this.cartTotalsOpen();
    this.cartTotalsOpen.set(next);
    try {
      localStorage.setItem(TakeOrderComponent.CART_TOTALS_OPEN_KEY, next ? 'true' : 'false');
    } catch {
      /* ignore quota / private mode */
    }
  }

  private static readCartTotalsOpen(): boolean {
    try {
      return localStorage.getItem(TakeOrderComponent.CART_TOTALS_OPEN_KEY) !== 'false';
    } catch {
      return true;
    }
  }

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
    this.searchInput$
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((term) => this.applyCatalogSearch(term));
    document.addEventListener('fullscreenchange', this.onFullscreenChange);
    if (this.authService.isPosCobranzaTerminal()) {
      void this.router.navigate(['/pos/cobranza'], { replaceUrl: true });
      return;
    }
    this.posBranchSession.ensureSelected().subscribe({
      next: (ok) => {
        if (!ok) {
          return;
        }
        resetPosWarehouseForBranch(this.authService.getBillingBranchId());
        const fiscalFromLogin = this.authService.getFiscalConfigurationId();
        if (fiscalFromLogin) {
          this.posState.fiscalConfigurationId.set(fiscalFromLogin);
        }
        if (this.canUseGlobalDiscounts()) {
          this.loadApplicableGlobalDiscounts();
        }
        this.loadData();
      },
      error: (error) => {
        this.notifyError(mapPosApiErrorMessage(error?.error?.message), 5000);
      },
    });
  }

  loadApplicableGlobalDiscounts(): void {
    if (!this.canUseGlobalDiscounts()) {
      this.applicableGlobalDiscounts.set([]);
      this.loadingGlobalDiscounts.set(false);
      return;
    }

    this.loadingGlobalDiscounts.set(true);
    this.globalDiscountService.getApplicableGlobalDiscounts().subscribe({
      next: (discounts) => {
        this.applicableGlobalDiscounts.set(discounts ?? []);
        this.loadingGlobalDiscounts.set(false);
        this.syncSelectedGlobalDiscount(discounts ?? []);
      },
      error: () => {
        this.applicableGlobalDiscounts.set([]);
        this.loadingGlobalDiscounts.set(false);
      },
    });
  }

  onGlobalDiscountChange(discountId: string): void {
    if (!this.canUseGlobalDiscounts()) {
      return;
    }
    if (!discountId) {
      this.posService.setGlobalDiscount(null);
      return;
    }
    const discount = this.applicableGlobalDiscounts().find((item) => item.id === discountId) ?? null;
    this.posService.setGlobalDiscount(discount);
  }

  formatGlobalDiscountOption = formatGlobalDiscountLabel;
  formatLineDiscountOption = formatApplicableDiscountLabel;

  selectedGlobalDiscountId(): string {
    return this.posService.cart().global_discount_id ?? '';
  }

  private syncSelectedGlobalDiscount(discounts: GlobalDiscount[]): void {
    const selectedId = this.posService.cart().global_discount_id;
    if (!selectedId) {
      return;
    }
    const stillApplicable = discounts.find((item) => item.id === selectedId) ?? null;
    if (!stillApplicable) {
      this.posService.setGlobalDiscount(null);
      return;
    }
    this.posService.setGlobalDiscount(stillApplicable);
  }

  isCobranzaTerminal(): boolean {
    return this.authService.isPosCobranzaTerminal();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    document.removeEventListener('fullscreenchange', this.onFullscreenChange);
  }

  terminalLabel(): string {
    const email = this.authService.user_info?.email ?? '';
    return email.split('@')[0] || 'Ventas';
  }

  branchLabel(): string {
    return this.posBranchSession.label();
  }

  canSwitchBranch(): boolean {
    return this.posBranchSession.canSwitch();
  }

  changeBranch(): void {
    this.posBranchSession.pickBranch({ required: false }).subscribe({
      next: (changed) => {
        if (!changed) {
          return;
        }
        this.posService.clearCart();
        resetPosWarehouseForBranch(this.authService.getBillingBranchId());
        const fiscal = this.authService.getFiscalConfigurationId();
        if (fiscal) {
          this.posState.fiscalConfigurationId.set(fiscal);
        }
        this.posState.setDailyShift(null);
        this.refreshDailyShift(() => this.notifyBranchSwitchResult());
        this.loadProducts(this.searchTerm());
      },
      error: (error) => {
        this.notifyError(
          mapPosApiErrorMessage(resolveHttpErrorMessage(error, 'No se pudo cambiar la sucursal')),
          5000
        );
      },
    });
  }

  loadData(): void {
    this.refreshDailyShift();
  }

  private applyInventorySummaryMeta(summary: PosInventorySummaryResponse): void {
    const enriched = enrichPosInventorySummary(summary);
    this.lastInventorySummary.set(enriched);

    const warehouseId = firstPosSummaryWarehouseId(enriched);
    persistPosWarehouseId(warehouseId);

    const loginBranch = this.authService.getBillingBranchId();
    if (loginBranch) {
      localStorage.setItem('pos_billing_branch_id', loginBranch);
    } else if (enriched.billing_branch_id) {
      localStorage.setItem('pos_billing_branch_id', enriched.billing_branch_id);
    }

    const fiscalId =
      this.authService.getFiscalConfigurationId() ||
      enriched.fiscal_configuration_id ||
      this.posState.fiscalConfigurationId();
    if (fiscalId) {
      this.posState.fiscalConfigurationId.set(fiscalId);
    }
  }

  private resolvePosSaleContext(): { warehouseId: string; fiscalConfigurationId: string } | null {
    const summary = this.lastInventorySummary();
    const warehouseId = firstPosSummaryWarehouseId(summary);
    const fiscalConfigurationId = (
      this.authService.getFiscalConfigurationId() ||
      summary?.fiscal_configuration_id ||
      this.posState.fiscalConfigurationId() ||
      ''
    ).trim();

    if (!warehouseId) {
      this.notifyError(
        'El catálogo POS no incluye almacén de tu sucursal. Recarga el catálogo e intenta de nuevo.',
        6000
      );
      return null;
    }
    if (!fiscalConfigurationId) {
      this.notifyError(
        'No hay configuración fiscal en la sesión. Vuelve a iniciar sesión.',
        6000
      );
      return null;
    }

    persistPosWarehouseId(warehouseId);
    this.posState.fiscalConfigurationId.set(fiscalConfigurationId);
    return { warehouseId, fiscalConfigurationId };
  }

  private rememberBranchContext(branch: unknown): void {
    if (!branch || typeof branch !== 'object') {
      return;
    }
    if (!this.authService.getBillingBranchId()) {
      const id = (branch as { id?: string }).id;
      if (id) {
        localStorage.setItem('pos_billing_branch_id', String(id).trim());
      }
    }
    if (!this.authService.getFiscalConfigurationId()) {
      const fiscalId = resolveFiscalConfigurationIdFromBranch(branch);
      if (fiscalId) {
        this.posState.fiscalConfigurationId.set(String(fiscalId));
      }
    }
  }

  refreshDailyShift(onDone?: () => void): void {
    this.posState.checkingShift.set(true);
    this.posService.getCurrentDailyShift().subscribe({
      next: (response) => {
        const forActiveBranch = this.posState.applyCurrentDailyShift(
          response,
          this.authService.getBillingBranchId()
        );
        this.posState.checkingShift.set(false);
        onDone?.();
        if (forActiveBranch) {
          this.ensureFiscalFromShift(forActiveBranch);
        }
        if (this.posState.seller()) {
          this.loadProducts();
        }
        this.maybePromptUnclosedShift();
      },
      error: (error) => {
        this.posState.checkingShift.set(false);
        if (!this.posState.hasOpenShiftRecord()) {
          this.posState.setDailyShift(null);
        }
        if (this.posState.seller()) {
          this.loadProducts();
        }
        this.maybePromptUnclosedShift();
        onDone?.();
        if (error?.status !== 404) {
          this.notifyError(mapPosApiErrorMessage(error.error?.message), 5000);
        }
      },
    });
  }

  private notifyBranchSwitchResult(): void {
    const name = this.posBranchSession.label();
    if (this.posState.requiresPreviousClose()) {
      this.notifyInfo(
        `${name}: hay un corte de otro día. Cobranza debe cerrarlo. Las ventas quedan en cola.`,
        6500
      );
      return;
    }
    if (this.posState.shiftOpen()) {
      this.notifySuccess(`${name}: corte abierto. Las ventas van a cobranza.`, 4000);
      return;
    }
    this.notifyInfo(
      `${name}: sin corte. Las ventas quedan en cola hasta que cobranza abra el día.`,
      5500
    );
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

  private maybePromptUnclosedShift(): void {
    const alert = this.posState.unclosedShiftAlert();
    if (!alert) {
      this.maybePromptSellerCode();
      return;
    }
    if (this.acknowledgedUnclosedIds.has(alert.daily_shift_id) || this.unclosedDialogOpen) {
      this.maybePromptSellerCode();
      return;
    }

    this.unclosedDialogOpen = true;
    this.dialog
      .open(UnclosedDailyShiftDialogComponent, {
        width: '440px',
        maxWidth: '95vw',
        disableClose: true,
        panelClass: 'pos-dialog-panel',
        data: { mode: 'ventas', alert },
      })
      .afterClosed()
      .subscribe(() => {
        this.unclosedDialogOpen = false;
        this.acknowledgedUnclosedIds.add(alert.daily_shift_id);
        this.maybePromptSellerCode();
      });
  }

  private maybePromptSellerCode(): void {
    if (this.unclosedDialogOpen) {
      return;
    }
    if (this.authService.isPosCobranzaTerminal()) {
      return;
    }
    if (!this.posState.needsSellerCode() || this.sellerDialogOpen) {
      return;
    }
    this.openSellerCodeDialog();
  }

  openSellerCodeDialog(): void {
    if (this.sellerDialogOpen) {
      return;
    }
    this.sellerDialogOpen = true;

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
          this.rememberBranchContext(response.terminal_user?.billing_branch);
          this.rememberBranchContext(response.daily_shift?.billing_branch);
          this.posState.setSeller(response.seller);
          this.notifySuccess(`Vendedor: ${this.posState.sellerDisplayName()}`, 3000);
          this.loadApplicableGlobalDiscounts();
          this.loadProducts();
        },
        error: (error) => {
          this.notifyError(mapPosApiErrorMessage(error.error?.message), 5000);
          this.openSellerCodeDialog();
        },
      });
    });
  }

  changeSeller(): void {
    this.posState.clearSeller();
    this.openSellerCodeDialog();
  }

  onSearchInput(term: string): void {
    this.searchTerm.set(term);
    this.searchInput$.next(term);
  }

  clearSearch(): void {
    if (!this.searchTerm()) {
      this.catalogSearchRef?.nativeElement.focus();
      return;
    }
    this.searchTerm.set('');
    this.searchInput$.next('');
    this.applyCatalogSearch('');
    this.catalogSearchRef?.nativeElement.focus();
  }

  private applyCatalogSearch(term: string): void {
    if (this.lastAppliedSearch === term) {
      return;
    }
    this.lastAppliedSearch = term;

    if (this.canSell()) {
      this.loadProducts(term);
      return;
    }

    const normalized = term.toLowerCase();
    if (!normalized.trim()) {
      this.filteredProducts.set(this.products());
      return;
    }

    const filtered = this.products().filter(
      (p) =>
        p.name.toLowerCase().includes(normalized) || p.sku.toLowerCase().includes(normalized)
    );
    this.filteredProducts.set(filtered);
  }

  openProductDetail(product: any, event?: Event): void {
    event?.stopPropagation();
    event?.preventDefault();

    const productId = product.product_id || product.id;
    if (!productId) {
      return;
    }

    this.dialog
      .open(ProductDetailModalComponent, {
        ...PRODUCT_DETAIL_DIALOG_CONFIG,
        data: {
          product: {
            id: productId,
            name: product.name,
            sku: product.sku,
          },
          isNew: false,
        },
      })
      .afterClosed()
      .subscribe(() => {
        if (this.canSell()) {
          this.loadProducts(this.searchTerm());
        }
      });
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

    this.commitProductToCart(product, {
      quantity: 1,
      product_discount_id: null,
      selected_discount: null,
    });
  }

  hasApplicableDiscounts(product: any): boolean {
    return Boolean(product.has_applicable_discounts) ||
      (Array.isArray(product.applicable_discounts) && product.applicable_discounts.length > 0);
  }

  productMeasureLine(product: any): string {
    if (!hasMeasureTotals(product?.measure_totals)) {
      return '';
    }
    return formatMeasureTotalsLine(product.measure_totals, formatInventoryNumber);
  }

  private commitProductToCart(
    product: any,
    selection: {
      quantity: number;
      product_discount_id: string | null;
      selected_discount: PosApplicableDiscount | null;
    }
  ): void {
    const cartItem = this.buildCartItem(product, selection);
    this.posService.addItem(cartItem);
    this.hydrateCartItemPricing(cartItem.product_id, cartItem.product_uom_id);
    this.notifySuccess(`${cartItem.product_name} agregado`, 2000);
  }

  private buildCartItem(
    product: any,
    selection: {
      quantity: number;
      product_discount_id: string | null;
      selected_discount: PosApplicableDiscount | null;
    }
  ): POSCartItem {
    const productUomId = String(product.product_uom_id || product.uom_id || '').trim();
    const base: POSCartItem = {
      product_id: product.product_id || product.id,
      product_name: product.product_name || product.name,
      product_sku: product.product_sku || product.sku || '',
      product_uom_id: productUomId,
      uom_id: product.uom_id || productUomId,
      uom_name: product.uom_name || 'Pieza',
      quantity: Math.max(0.001, selection.quantity),
      unit_price: Number(product.suggested_unit_price ?? product.cost ?? 0),
      iva_percentage: Number(product.suggested_iva_percentage ?? 16),
      ieps_percentage: Number(product.suggested_ieps_percentage ?? 0),
      subtotal: 0,
      line_gross_subtotal: 0,
      line_discount_amount: 0,
      iva_amount: 0,
      ieps_amount: 0,
      line_total: 0,
      product_discount_id: selection.product_discount_id,
      selected_discount: selection.selected_discount,
      pricing_options: normalizePosPricingOptions(collectPosPricingOptions(product)),
      selected_price_list_id: '',
      suggested_unit_price: Number(product.suggested_unit_price ?? product.cost ?? 0),
      suggested_iva_percentage: Number(product.suggested_iva_percentage ?? 16),
      suggested_ieps_percentage: Number(product.suggested_ieps_percentage ?? 0),
      applicable_discounts: Array.isArray(product.applicable_discounts) ? product.applicable_discounts : [],
    };

    return this.posService.recalculateItem(base);
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

  onLineDiscountChange(index: number, discountId: string): void {
    const item = this.posService.cart().items[index];
    if (!item) {
      return;
    }

    if (!discountId) {
      this.posService.updateItemDiscount(index, null);
      return;
    }

    const discounts = Array.isArray(item.applicable_discounts) ? item.applicable_discounts : [];
    const selected = discounts.find((discount) => discount.id === discountId) ?? null;
    this.posService.updateItemDiscount(index, selected);
  }

  onPricingOptionChange(index: number, optionId: string): void {
    const selectedId = optionId == null ? '' : String(optionId);
    this.applyPricingOption(index, selectedId);
    const item = this.posService.cart().items[index];
    if (!item || !selectedId) {
      return;
    }
    this.hydrateCartItemPricing(item.product_id, item.product_uom_id, index, selectedId);
  }

  private applyPricingOption(index: number, optionId: string): void {
    const item = this.posService.cart().items[index];
    if (!item) {
      return;
    }

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
    if (!selected) {
      return;
    }

    const unitPrice = Number(selected.price);
    this.posService.updateItemPricing(index, {
      unit_price: Number.isFinite(unitPrice) ? unitPrice : Number(item.unit_price ?? 0),
      iva_percentage: Number(selected.iva_percentage ?? item.iva_percentage ?? 0),
      ieps_percentage: Number(selected.ieps_percentage ?? item.ieps_percentage ?? 0),
      selected_price_list_id: String(selected.price_list_id),
    });
  }

  private hydrateCartItemPricing(
    productId: string,
    productUomId: string,
    index?: number,
    selectedId?: string
  ): void {
    const cacheKey = `${productId}:${productUomId || ''}`;
    const apply = (options: PosPricingOption[]) => {
      if (options.length === 0) {
        return;
      }
      const items = this.posService.cart().items;
      const targetIndex =
        index != null && items[index]?.product_id === productId
          ? index
          : items.findIndex(
              (item) =>
                item.product_id === productId &&
                String(item.product_uom_id || '') === String(productUomId || '')
            );
      if (targetIndex < 0) {
        return;
      }
      this.posService.replaceItemPricingOptions(targetIndex, options);
      const currentId =
        selectedId ?? this.posService.cart().items[targetIndex]?.selected_price_list_id ?? '';
      if (currentId) {
        this.applyPricingOption(targetIndex, currentId);
      }
    };

    const cached = this.productPricingCache.get(cacheKey);
    if (cached) {
      apply(cached);
      return;
    }

    this.productService.getProductPrices(productId).subscribe({
      next: (raw) => {
        const prices = filterProductPricesForUom(unwrapProductPriceList(raw), productUomId);
        const options = normalizePosPricingOptions(prices);
        if (options.length > 0) {
          this.productPricingCache.set(cacheKey, options);
        }
        apply(options);
      },
      error: () => {
        // Si falla el detalle de precios, se mantiene lo que vino en el summary POS.
      },
    });
  }

  saveOrder(): void {
    if (this.saving() || this.confirming()) {
      return;
    }
    if (!this.canSell()) {
      this.notifyError('Identifica al vendedor con su código para registrar la venta', 4000);
      this.openSellerCodeDialog();
      return;
    }

    const cart = this.posService.cart();
    if (cart.items.length === 0) {
      this.notifyInfo('Agrega productos a la orden', 3000);
      return;
    }

    const seller = this.posState.seller();
    if (!seller?.id) {
      this.openSellerCodeDialog();
      return;
    }

    const ctx = this.resolvePosSaleContext();
    if (!ctx) {
      return;
    }

    this.confirmCheckout({
      kind: 'sale',
      title: 'Registrar venta',
      subtitle: this.posState.salesQueueMode()
        ? 'Se registrará y quedará en cola hasta que cobranza cierre el corte anterior y abra el de hoy.'
        : 'Se registrará la venta y el cliente pasará a cobranza para pagar.',
      totalLabel: this.formatCurrency(cart.grand_total),
      itemSummary: this.cartItemSummary(cart),
      acceptLabel: 'Registrar venta',
      queued: this.posState.salesQueueMode(),
    }).subscribe((confirmed) => {
      if (!confirmed) {
        return;
      }

      const payload = buildVentasPosOrderPayload(cart, {
        warehouseId: ctx.warehouseId,
        fiscalConfigurationId: ctx.fiscalConfigurationId,
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
          const backendMessage = error?.error?.message;
          const msg = mapPosApiErrorMessage(backendMessage) || 'Error al crear la orden de venta';
          this.notifyError(msg, 6000);
          if (error?.status === 400 && isDiscountApiError(backendMessage)) {
            this.loadProducts(this.searchTerm());
          }
        },
      });
    });
  }

  saveQuotation(): void {
    if (this.saving() || this.confirming()) {
      return;
    }
    if (!this.canQuote()) {
      this.notifyError('No tienes permiso para cotizar', 4000);
      return;
    }
    if (!this.canSell()) {
      this.notifyError('Identifica al vendedor con su código para cotizar', 4000);
      this.openSellerCodeDialog();
      return;
    }

    const cart = this.posService.cart();
    if (cart.items.length === 0) {
      this.notifyInfo('Agrega productos a la cotización', 3000);
      return;
    }

    const seller = this.posState.seller();
    if (!seller?.id) {
      this.openSellerCodeDialog();
      return;
    }

    const ctx = this.resolvePosSaleContext();
    if (!ctx) {
      return;
    }

    this.confirmCheckout({
      kind: 'quote',
      title: 'Guardar cotización',
      subtitle: 'No se retiene inventario ni se cobra. Puedes convertirla en venta después.',
      totalLabel: this.formatCurrency(cart.grand_total),
      itemSummary: this.cartItemSummary(cart),
      acceptLabel: 'Guardar cotización',
    }).subscribe((confirmed) => {
      if (!confirmed) {
        return;
      }

      const payload = buildVentasPosOrderPayload(cart, {
        warehouseId: ctx.warehouseId,
        fiscalConfigurationId: ctx.fiscalConfigurationId,
        sellerUserId: seller.id,
        terminalLabel: this.terminalLabel(),
      });

      this.saving.set(true);
      this.posService.createPosQuotation(payload).subscribe({
        next: (quotation) => {
          this.saving.set(false);
          const folioLabel = quotation.folio ? quotation.folio : 'sin folio';
          this.notifySuccess(`Cotización guardada (${folioLabel}). No se retuvo inventario.`, 6000);
          this.posService.clearCart();
          this.loadProducts(this.searchTerm());
        },
        error: (error) => {
          this.saving.set(false);
          const backendMessage = error?.error?.message;
          const msg = mapPosApiErrorMessage(backendMessage) || 'Error al crear la cotización';
          this.notifyError(msg, 6000);
        },
      });
    });
  }

  private confirmCheckout(data: PosCheckoutConfirmDialogData) {
    this.confirming.set(true);
    return this.dialog
      .open(PosCheckoutConfirmDialogComponent, {
        width: '420px',
        maxWidth: '95vw',
        disableClose: true,
        panelClass: 'pos-dialog-panel',
        autoFocus: 'first-tabbable',
        data,
      })
      .afterClosed()
      .pipe(
        tap(() => this.confirming.set(false)),
      );
  }

  private cartItemSummary(cart: POSCart): string {
    const lines = cart.items.length;
    const qty = cart.items.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
    const lineLabel = lines === 1 ? '1 producto' : `${lines} productos`;
    if (qty > 0 && qty !== lines) {
      return `${lineLabel} · ${qty} pzas`;
    }
    return lineLabel;
  }

  cancel(): void {
    if (confirm('¿Descartar orden actual?')) {
      this.posService.clearCart();
      this.router.navigate(['/pos/ventas']);
    }
  }

  formatCurrency(amount: number): string {
    return formatUnitCurrency(amount);
  }

  /** Precio de lista con IVA e IEPS, para que el drop coincida con el total de línea. */
  pricingOptionGross(opt: { price?: number | string; iva_percentage?: number | string; ieps_percentage?: number | string }): number {
    return this.unitPriceWithTaxes(opt.price, opt.iva_percentage, opt.ieps_percentage);
  }

  suggestedPricingGross(item: POSCartItem): number {
    return this.unitPriceWithTaxes(
      item.suggested_unit_price ?? item.unit_price,
      item.suggested_iva_percentage ?? item.iva_percentage,
      item.suggested_ieps_percentage ?? item.ieps_percentage
    );
  }

  catalogPriceGross(product: {
    cost?: number | string;
    suggested_unit_price?: number | string;
    suggested_iva_percentage?: number | string | null;
    suggested_ieps_percentage?: number | string | null;
    iva_percentage?: number | string | null;
    ieps_percentage?: number | string | null;
  }): number {
    return this.unitPriceWithTaxes(
      product.suggested_unit_price ?? product.cost,
      product.suggested_iva_percentage ?? product.iva_percentage ?? 16,
      product.suggested_ieps_percentage ?? product.ieps_percentage ?? 0
    );
  }

  private unitPriceWithTaxes(
    net: number | string | null | undefined,
    ivaPercentage: number | string | null | undefined,
    iepsPercentage: number | string | null | undefined
  ): number {
    const price = Number(net) || 0;
    const iva = Number(ivaPercentage) || 0;
    const ieps = Number(iepsPercentage) || 0;
    return price * (1 + iva / 100 + ieps / 100);
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

  cartQueueHint(): string {
    if (this.posState.requiresPreviousClose()) {
      return 'Hay un corte de otro día sin cerrar. La venta quedará en cola hasta que cobranza lo cierre y abra el de hoy.';
    }
    if (this.posState.shiftOpen()) {
      return 'Corte activo — la venta irá directo a cobranza pendiente de pago.';
    }
    return 'Sin corte abierto — la venta quedará en cola hasta que cobranza abra el día.';
  }

  catalogEmptyMessage(): string {
    if (this.priceListError()) {
      return 'No se pudo cargar el catálogo. Revisa la sucursal.';
    }
    if (this.searchTerm().trim()) {
      return 'No hay productos que coincidan con tu búsqueda.';
    }
    return 'No hay productos disponibles en esta sucursal.';
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
            suggested_iva_percentage: Number(row.suggested_iva_percentage ?? 16),
            suggested_ieps_percentage: Number(row.suggested_ieps_percentage ?? 0),
            has_price: row.suggested_unit_price != null || row.cost != null,
            total_available_quantity: Number(row.total_available_quantity ?? row.available_quantity ?? 0),
            measure_totals: Array.isArray(row.measure_totals) ? row.measure_totals : [],
            pricing_options: normalizePosPricingOptions(collectPosPricingOptions(row)),
            product_uom_id: row.product_uom_id || row.uom_id || '',
            applicable_discounts: Array.isArray(row.applicable_discounts) ? row.applicable_discounts : [],
            has_applicable_discounts:
              Boolean(row.has_applicable_discounts) ||
              (Array.isArray(row.applicable_discounts) && row.applicable_discounts.length > 0),
          }));
          this.products.set(normalized);
          this.filteredProducts.set(normalized);
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
