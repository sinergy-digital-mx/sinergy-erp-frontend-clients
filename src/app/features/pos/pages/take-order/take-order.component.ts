import {
  AfterViewInit,
  Component,
  HostListener,
  NgZone,
  OnDestroy,
  OnInit,
  effect,
  untracked,
  signal,
  computed,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subject, Subscription, catchError, debounceTime, distinctUntilChanged, forkJoin, map, of, switchMap, takeUntil, tap } from 'rxjs';
import { SpinnerComponent } from '../../../../core/components/spinner/spinner.component';
import { formatBusinessDateTime } from '../../../../core/utils/api-datetime.util';
import { ToastService } from '../../../../core/services/toast.service';
import { AssignedBranch, AuthService } from '../../../../core/services/auth.service';
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
  Package,
  User,
  Percent,
  Check,
  Info,
  ChevronDown,
  ChevronRight,
  X,
  RefreshCw,
  LayoutGrid,
  List,
  ListFilter,
  Store,
  Warehouse,
  Hash,
} from 'lucide-angular';
import { PosOverlayHostDirective } from '../../directives/pos-overlay-host.directive';
import {
  PosConfirmDialogComponent,
  PosConfirmDialogData,
} from '../../components/pos-confirm-dialog/pos-confirm-dialog.component';
import { SellerCodeDialogComponent } from '../../components/seller-code-dialog/seller-code-dialog.component';
import {
  PosCustomerPickerDialogComponent,
  PosCustomerPickerDialogResult,
} from '../../components/pos-customer-picker-dialog/pos-customer-picker-dialog.component';
import { PosBranchSessionService } from '../../services/pos-branch-session.service';
import { UnclosedDailyShiftDialogComponent } from '../../components/unclosed-daily-shift-dialog/unclosed-daily-shift-dialog.component';
import {
  PosCheckoutConfirmDialogComponent,
  PosCheckoutConfirmDialogData,
  PosCheckoutConfirmResult,
  isPosCheckoutQuoteResult,
} from '../../components/pos-checkout-confirm-dialog/pos-checkout-confirm-dialog.component';
import { ProductDetailModalComponent } from '../../../settings/components/product-detail-modal/product-detail-modal.component';
import { PRODUCT_DETAIL_DIALOG_CONFIG } from '../../../../core/config/form-dialog.config';
import { POSService } from '../../services/pos.service';
import {
  acceptSlotReprice,
  PosCartSlotId,
  PosCartSlotLine,
  PosCartSlotState,
  PosCartSlotsService,
} from '../../services/pos-cart-slots.service';
import {
  PosFolioCartPick,
  PosFoliosDialogComponent,
} from '../../components/pos-folios-dialog/pos-folios-dialog.component';
import { PosStateService } from '../../services/pos-state.service';
import { POSCart, POSCartItem, PosCajaQueueTicket, PosSaleInProgress } from '../../models/pos.model';
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
  mapCartLineToOrderLine,
  mapInProgressLineToCartItem,
  posSaleObservation,
  resolveFiscalConfigurationIdFromBranch,
  todayIsoDate,
} from '../../utils/pos-order.util';
import {
  ADVANCE_CONCEPT_SKU,
  AdvanceWizardDialogComponent,
  AdvanceWizardOpenResult,
} from '../../../quotations/components/advance-wizard-dialog/advance-wizard-dialog.component';
import { QuotationService } from '../../../quotations/services/quotation.service';
import { SalesOrderService } from '../../../sales-orders/services/sales-order.service';
import { defaultStampEnvironment } from '../../../sales-orders/models/sales-order-electronic-invoice.model';
import { isValidWalkInRfc, normalizeWalkInRfc } from '../../utils/walk-in-ticket.util';
import { prettyPosBranchLabel } from '../../utils/pos-branch-label.util';
import { PosBranchStockResponse } from '../../models/pos-branch-stock.model';
import { resolvePosCollectCustomerId } from '../../utils/pos-collect.util';
import { posRegisteredCustomerLabel } from '../../models/pos-collected-sales.model';
import { isDiscountApiError, formatGlobalDiscountLabel, formatApplicableDiscountLabel } from '../../utils/pos-discount.util';
import { GlobalDiscountService } from '../../../global-discounts/services/global-discount.service';
import { GlobalDiscount } from '../../../global-discounts/models/global-discount.model';
import { GLOBAL_DISCOUNT_PERMISSIONS } from '../../../global-discounts/config/permissions.config';
import { GlobalDiscountFormDialogComponent } from '../../../global-discounts/components/global-discount-form-dialog/global-discount-form-dialog.component';
import { QUOTATION_PERMISSIONS } from '../../../quotations/config/permissions.config';
import { POS_PERMISSIONS } from '../../config/permissions.config';
import { normalizePriceDiscountPercent } from '../../utils/pos-discount.util';
import { mapPosApiErrorMessage, posProductLabelsById } from '../../constants/pos-api-errors';
import { resolveHttpErrorMessage } from '../../../../core/utils/http-error-message.util';
import { formatMeasureTotalsLine, hasMeasureTotals } from '../../../../core/utils/inventory-measure.util';
import { formatUnitCurrency } from '../../../../core/utils/unit-money.util';
import { formatInventoryNumber } from '../../../inventory/utils/inventory-list.util';
import { CustomerService } from '../../../../core/services/customer.service';
import { unwrapCustomerPayload } from '../../../customers/utils/customer-credit.util';
import {
  buildCustomerFiscalSnapshot,
  PosCheckoutCustomerFiscal,
  PosCheckoutCustomerSnapshot,
} from '../../components/pos-checkout-confirm-dialog/pos-checkout-confirm-dialog.component';
import { CustomerEditModalComponent } from '../../../customers/components/customer-edit-modal/customer-edit-modal.component';
import { CUSTOMER_FORM_DIALOG_CONFIG } from '../../../../core/config/form-dialog.config';

@Component({
  selector: 'app-take-order',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    SpinnerComponent,
    PosOverlayHostDirective,
  ],
  templateUrl: './take-order.component.html',
  styleUrls: ['./take-order.component.scss'],
})
export class TakeOrderComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('posRoot') posRootRef?: ElementRef<HTMLElement>;
  @ViewChild('catalogSearch') catalogSearchRef?: ElementRef<HTMLInputElement>;
  @ViewChild('catalogList') catalogListRef?: ElementRef<HTMLElement>;
  readonly Search = Search;
  readonly Plus = Plus;
  readonly ShoppingCart = ShoppingCart;
  readonly Trash2 = Trash2;
  readonly Minus = Minus;
  readonly Maximize2 = Maximize2;
  readonly Minimize2 = Minimize2;
  readonly Package = Package;
  readonly User = User;
  readonly Percent = Percent;
  readonly Check = Check;
  readonly Info = Info;
  readonly ChevronDown = ChevronDown;
  readonly ChevronRight = ChevronRight;
  readonly X = X;
  readonly RefreshCw = RefreshCw;
  readonly Store = Store;
  readonly LayoutGrid = LayoutGrid;
  readonly List = List;
  readonly ListFilter = ListFilter;
  readonly Warehouse = Warehouse;
  readonly Hash = Hash;

  private static readonly CATALOG_VIEW_KEY = 'pos_catalog_view';
  catalogView = signal<'cards' | 'list' | 'branches'>(TakeOrderComponent.readCatalogView());
  branchStock = signal<PosBranchStockResponse | null>(null);
  branchTableLoading = signal(false);
  branchTableError = signal('');
  private branchTableRequest = 0;
  readonly branchRows = computed(() => this.buildBranchRows());
  catalogBranchId = signal('');
  browseBranches = signal<AssignedBranch[]>([]);
  shortcutsOpen = signal(false);
  cajaQueueOpen = signal(false);
  cajaQueue = signal<PosCajaQueueTicket[]>([]);
  cajaExpandedId = signal<string | null>(null);
  loadingCajaQueue = signal(false);
  recallingId = signal<string | null>(null);

  private static readonly CART_TOTALS_OPEN_KEY = 'pos_cart_totals_open';
  cartTotalsOpen = signal(TakeOrderComponent.readCartTotalsOpen());

  products = signal<any[]>([]);
  filteredProducts = signal<any[]>([]);

  searchTerm = signal<string>('');
  /** Índice marcado en los resultados de la búsqueda. -1 si no hay búsqueda activa. */
  catalogActiveIndex = signal(-1);
  readonly markedCatalogIndex = computed(() => {
    if (!this.searchTerm().trim() || this.filteredProducts().length === 0) {
      return -1;
    }
    const index = this.catalogActiveIndex();
    if (index < 0 || index >= this.filteredProducts().length) {
      return 0;
    }
    return index;
  });
  readonly formatStock = formatInventoryNumber;
  catalogWarehouseId = signal('');
  catalogFiltersOpen = signal(false);
  /** Permite agregar productos con existencia 0. Esos renglones solo se pueden cotizar. */
  allowWithoutInventory = signal(false);
  readonly catalogFiltersCount = computed(
    () => (this.catalogWarehouseId() ? 1 : 0) + (this.allowWithoutInventory() ? 1 : 0),
  );
  loading = signal<boolean>(false);
  saving = signal<boolean>(false);
  confirming = signal<boolean>(false);
  salesInProgress = signal<PosSaleInProgress[]>([]);
  loadingTickets = signal(false);
  editingSaleId = signal<string | null>(null);
  editingFolio = signal<string | null>(null);
  editingTicketKind = signal<'sale' | 'advance'>('sale');
  editingAdvanceAmount = signal<number | null>(null);
  editingAdvanceUsoCfdi = signal<string | null>(null);
  editingAdvanceMetodoPago = signal<'PUE' | 'PPD' | null>(null);
  editingAdvanceCollected = signal(false);
  editingAdvanceEnvironment = signal<'demo' | 'production' | null>(null);
  editingQuotationId = signal<string | null>(null);
  editingQuotationFolio = signal<string | null>(null);
  editingAdvanceInvoiceId = signal<string | null>(null);
  readonly pdfBusy = signal<'' | 'advance' | 'quote' | 'sale'>('');
  ticketSlotAsk = signal<PosSaleInProgress | null>(null);
  editingForShipping = signal(false);
  selectedCustomerRouteId = signal<string | null>(null);
  editingNotes = signal('');
  private pendingResumeTicketId: string | null = null;

  selectedCustomerId = signal('');
  private customerFiscalCache: { id: string; fiscal: PosCheckoutCustomerFiscal } | null = null;
  selectedCustomerName = signal('Público en General');
  selectedOrderCustomerId = signal<number | string | null>(null);
  walkInName = signal('');
  readonly saleIvaPercent = signal<8 | 16>(8);
  walkInTicketOpen = signal(false);
  walkInRfc = signal('');
  activeCartSlot = signal<PosCartSlotId>(1);
  readonly landedSlot = signal<PosCartSlotId | null>(null);
  slotsReady = signal(false);
  private repriceToken = 0;
  private repriceSub: Subscription | null = null;
  private landedTimer: ReturnType<typeof setTimeout> | null = null;
  private pendingGlobalDiscountId: string | null = null;
  readonly hasSelectedCustomer = computed(() => Boolean(this.selectedCustomerId()));
  readonly walkInRfcInvalid = computed(() => !isValidWalkInRfc(this.walkInRfc()));

  priceListError = signal<boolean>(false);
  isFullscreen = signal<boolean>(false);
  /** El siguiente Esc sale de pantalla completa. El primero solo limpia la búsqueda. */
  private escExitArmed = false;
  /** El navegador suelta pantalla completa con Esc; hay que volver a entrar si ese Esc era para la búsqueda. */
  private restoreFullscreenAfterEsc = false;
  private escapeLocked = false;

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
  globalDiscountPickerOpen = signal(false);

  cartHasItems = computed(() => this.posService.cart().items.length > 0);
  cartHasWithoutInventory = computed(() =>
    this.posService.cart().items.some((item) => item.without_inventory),
  );

  readonly isEditingReturnedTicket = computed(() => Boolean(this.editingSaleId()));
  readonly isEditingReturnedAdvance = computed(
    () => this.isEditingReturnedTicket() && this.editingTicketKind() === 'advance',
  );

  canUseGlobalDiscounts = computed(() =>
    GLOBAL_DISCOUNT_PERMISSIONS.viewList.some((permission) =>
      this.authService.hasPermission(permission)
    )
  );

  canCreateGlobalDiscounts = computed(() =>
    GLOBAL_DISCOUNT_PERMISSIONS.create.some((permission) =>
      this.authService.hasPermission(permission)
    )
  );

  readonly canApplyPriceDiscount = computed(() =>
    this.authService.hasPermission(POS_PERMISSIONS.applyPriceDiscount),
  );

  priceDiscountOpenIndex = signal<number | null>(null);
  priceDiscountDropUp = signal(false);
  priceDiscountAlignEnd = signal(false);
  customPriceDiscount = signal('');

  cartPriceDiscounts = computed(() =>
    this.posService
      .cart()
      .items.filter((item) => (item.price_discount_amount ?? 0) > 0.009)
      .map((item) => ({
        productName: item.product_name,
        percent: item.price_discount_percentage ?? 0,
        amount: item.price_discount_amount ?? 0,
      })),
  );

  cartHasPriceDiscount = computed(() => (this.posService.cart().total_price_discount ?? 0) > 0.009);

  applicableGlobalDiscounts = signal<GlobalDiscount[]>([]);
  loadingGlobalDiscounts = signal(false);

  private lastInventorySummary = signal<PosInventorySummaryResponse | null>(null);
  /** Enter llegó antes de que la búsqueda terminara: agrega el primer resultado. */
  private addHighlightedOnNextResults = false;
  private readonly onWindowKeydown = (event: KeyboardEvent): void => {
    if (event.type !== 'keydown') {
      return;
    }
    this.ngZone.run(() => this.onPosKeydown(event));
  };

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
    private route: ActivatedRoute,
    private toast: ToastService,
    private dialog: MatDialog,
    private globalDiscountService: GlobalDiscountService,
    private productService: ProductService,
    private posBranchSession: PosBranchSessionService,
    private customerService: CustomerService,
    private ngZone: NgZone,
    private cartSlots: PosCartSlotsService,
    private quotations: QuotationService,
    private salesOrders: SalesOrderService,
  ) {
    effect(() => {
      const ready = this.slotsReady();
      const editing = this.editingSaleId();
      const slot = this.activeCartSlot();
      const cart = this.posService.cart();
      const customerId = this.selectedCustomerId();
      const customerName = this.selectedCustomerName();
      const orderCustomerId = this.selectedOrderCustomerId();
      const walkInName = this.walkInName();
      const walkInRfc = this.walkInRfc();
      if (!ready || editing) {
        return;
      }
      const key = this.slotScopeKey();
      if (!key) {
        return;
      }
      const state: PosCartSlotState = {
        customerId: customerId || (orderCustomerId != null ? String(orderCustomerId) : null),
        customerName,
        walkInName,
        walkInRfc,
        globalDiscountId: cart.global_discount_id,
        lines: cart.items.map((item) => this.lineIdentity(item)),
      };
      untracked(() => this.cartSlots.writeSlot(key, slot, state));
    });
  }

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

  private static readCatalogView(): 'cards' | 'list' | 'branches' {
    try {
      const saved = localStorage.getItem(TakeOrderComponent.CATALOG_VIEW_KEY);
      if (saved === 'list' || saved === 'branches') {
        return saved;
      }
    } catch {
      /* ignore */
    }
    return 'cards';
  }

  setCatalogView(view: 'cards' | 'list' | 'branches'): void {
    this.catalogView.set(view);
    try {
      localStorage.setItem(TakeOrderComponent.CATALOG_VIEW_KEY, view);
    } catch {
      /* ignore quota / private mode */
    }
    if (view === 'branches') {
      this.loadBranchTable(this.searchTerm());
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

  private mapPosError(
    backendMessage: string | string[] | undefined | null,
    items?: POSCartItem[],
  ): string {
    return mapPosApiErrorMessage(backendMessage, posProductLabelsById(items));
  }

  private notifySuccess(message: string, duration = 3000): void {
    this.toast.success(message, { duration });
  }

  private notifyInfo(message: string, duration = 3500): void {
    this.toast.info(message, { duration });
  }

  ngOnInit(): void {
    window.addEventListener('keydown', this.onWindowKeydown, true);
    this.searchInput$
      .pipe(debounceTime(300), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((term) => this.applyCatalogSearch(term));
    document.addEventListener('fullscreenchange', this.onFullscreenChange);
    const resumeTicket = this.route.snapshot.queryParamMap.get('ticket');
    if (resumeTicket) {
      this.pendingResumeTicketId = resumeTicket;
    }
    if (this.authService.isPosCobranzaTerminal()) {
      void this.router.navigate(['/pos/cobranza'], { replaceUrl: true });
    }
  }

  ngAfterViewInit(): void {
    if (this.authService.isPosCobranzaTerminal()) {
      return;
    }
    this.posBranchSession.ensureSelected().subscribe({
      next: (ok) => {
        if (!ok) {
          return;
        }
        resetPosWarehouseForBranch(this.authService.getBillingBranchId());
        this.syncBrowseBranches(this.authService.getBillingBranchId());
        const fiscalFromLogin = this.authService.getFiscalConfigurationId();
        if (fiscalFromLogin) {
          this.posState.fiscalConfigurationId.set(fiscalFromLogin);
        }
        if (this.canUseGlobalDiscounts()) {
          this.loadApplicableGlobalDiscounts();
        }
        this.loadCartSlots();
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
        this.tryApplyPendingGlobalDiscount();
      },
      error: () => {
        this.applicableGlobalDiscounts.set([]);
        this.loadingGlobalDiscounts.set(false);
      },
    });
  }

  openCreateGlobalDiscount(): void {
    if (!this.canCreateGlobalDiscounts()) {
      this.notifyError('No tienes permiso para crear descuentos globales', 3500);
      return;
    }

    this.dialog
      .open(GlobalDiscountFormDialogComponent, {
        width: '560px',
        maxWidth: '95vw',
        panelClass: 'pos-dialog-panel',
        data: { discount: null },
      })
      .afterClosed()
      .subscribe((created) => {
        if (created) {
          this.loadApplicableGlobalDiscounts();
        }
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
    this.cancelSlotReprice();
    if (this.landedTimer) clearTimeout(this.landedTimer);
    window.removeEventListener('keydown', this.onWindowKeydown, true);
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

  catalogIsReadOnly(): boolean {
    const view = this.catalogBranchId().trim();
    const sell = (this.authService.getBillingBranchId() || '').trim();
    return Boolean(view && sell && view !== sell);
  }

  catalogBranchLabel(): string {
    const id = this.catalogBranchId();
    const match = this.browseBranches().find((row) => row.id === id);
    return match?.display_name || match?.code || 'otra sucursal';
  }

  onCatalogBranch(branchId: string): void {
    this.catalogBranchId.set(branchId);
    this.catalogWarehouseId.set('');
    this.loadProducts(this.searchTerm());
  }

  private syncBrowseBranches(sellingBranchId?: string | null): void {
    const branches = this.authService.getAssignedBranches();
    this.browseBranches.set(branches);
    const selling = (sellingBranchId || this.authService.getBillingBranchId() || '').trim();
    this.catalogBranchId.set(selling);
  }

  onPosKeydown(event: KeyboardEvent): void {
    if (this.isCobranzaTerminal()) {
      return;
    }
    const key = event.key;
    if (key !== 'Escape') {
      this.escExitArmed = false;
    }
    if (this.isPlainCtrl(event, 'KeyI')) {
      event.preventDefault();
      if (this.dialog.openDialogs.length || !this.canSell()) {
        return;
      }
      this.shortcutsOpen.set(false);
      this.openCustomerPicker();
      return;
    }
    if (this.isPlainCtrl(event, 'KeyM')) {
      event.preventDefault();
      if (this.dialog.openDialogs.length) {
        return;
      }
      this.openCajaQueue();
      return;
    }
    if (key === 'Escape') {
      if (event.repeat) {
        return;
      }
      if (this.dialog.openDialogs.length) {
        this.escExitArmed = false;
        this.armFullscreenRestore();
        return;
      }
      if (this.priceDiscountOpenIndex() != null) {
        event.preventDefault();
        this.priceDiscountOpenIndex.set(null);
        this.escExitArmed = false;
        this.armFullscreenRestore();
        return;
      }
      if (this.catalogFiltersOpen()) {
        event.preventDefault();
        this.catalogFiltersOpen.set(false);
        this.escExitArmed = false;
        this.armFullscreenRestore();
        return;
      }
      if (this.shortcutsOpen()) {
        event.preventDefault();
        this.shortcutsOpen.set(false);
        this.escExitArmed = false;
        this.armFullscreenRestore();
        return;
      }
      if (this.cajaQueueOpen()) {
        event.preventDefault();
        if (this.cajaExpandedId()) {
          this.cajaExpandedId.set(null);
        } else {
          this.cajaQueueOpen.set(false);
        }
        this.escExitArmed = false;
        this.armFullscreenRestore();
        return;
      }
      event.preventDefault();
      if (this.searchTerm()) {
        this.clearSearch();
        this.escExitArmed = true;
        this.armFullscreenRestore();
        return;
      }
      if (this.escExitArmed && (document.fullscreenElement || this.isFullscreen())) {
        this.escExitArmed = false;
        this.restoreFullscreenAfterEsc = false;
        this.escapeLocked = false;
        if (document.fullscreenElement) {
          void document.exitFullscreen();
        }
        return;
      }
      this.escExitArmed = true;
      this.catalogSearchRef?.nativeElement?.focus();
      this.armFullscreenRestore();
      return;
    }
    if (event.ctrlKey || event.altKey || event.metaKey || this.dialog.openDialogs.length) {
      return;
    }
    if (this.shortcutsOpen() || this.cajaQueueOpen()) {
      return;
    }
    const target = event.target as HTMLElement | null;
    const inSearch = target?.classList?.contains('pos-search__input') === true;
    if (key === 'ArrowDown' || key === 'ArrowUp') {
      if (this.catalogView() === 'branches' || !this.catalogKeysAllowed(target) || this.markedCatalogIndex() < 0) {
        return;
      }
      event.preventDefault();
      this.moveCatalogSelection(key === 'ArrowDown' ? 1 : -1);
      return;
    }
    if (key === 'Enter') {
      if (this.catalogView() === 'branches' || !this.catalogKeysAllowed(target) || event.repeat) {
        return;
      }
      if (target?.closest('.pos-product-row, .pos-card')) {
        return;
      }
      const product = this.activeCatalogProduct();
      if (!product) {
        if (inSearch && this.searchTerm().trim()) {
          event.preventDefault();
          this.addHighlightedOnNextResults = true;
        }
        return;
      }
      if (!this.canAddToCart(product)) {
        return;
      }
      event.preventDefault();
      this.addHighlightedOnNextResults = false;
      this.addProductToCart(product);
      return;
    }
    if (key.length !== 1 || event.repeat || this.isTypingTarget(target)) {
      return;
    }
    event.preventDefault();
    this.catalogSearchRef?.nativeElement?.focus();
    this.onSearchInput(`${this.searchTerm()}${key}`);
  }

  /** Ctrl + letra, sin Alt, Shift ni la tecla de Windows. Esas letras no las usa el navegador. */
  private isPlainCtrl(event: KeyboardEvent, code: string): boolean {
    return event.ctrlKey && !event.altKey && !event.shiftKey && !event.metaKey && event.code === code;
  }

  private catalogKeysAllowed(target: HTMLElement | null): boolean {
    if (!target) {
      return true;
    }
    if (target.classList.contains('pos-search__input')) {
      return true;
    }
    if (target.closest('.pos-product-row, .pos-card')) {
      return true;
    }
    if (this.isTypingTarget(target)) {
      return false;
    }
    const tag = target.tagName;
    return tag !== 'BUTTON' && tag !== 'A';
  }

  private activeCatalogProduct(): any | null {
    const index = this.markedCatalogIndex();
    if (index < 0) {
      return null;
    }
    return this.filteredProducts()[index] ?? null;
  }

  private moveCatalogSelection(delta: number): void {
    const rows = this.filteredProducts();
    const current = this.markedCatalogIndex();
    if (!rows.length || current < 0) {
      return;
    }
    const next = Math.min(rows.length - 1, Math.max(0, current + delta));
    if (next === current) {
      return;
    }
    this.catalogActiveIndex.set(next);
    this.scrollCatalogActiveIntoView();
    const input = this.catalogSearchRef?.nativeElement;
    if (input && document.activeElement !== input) {
      input.focus();
      const end = input.value.length;
      input.setSelectionRange(end, end);
    }
  }

  private scrollCatalogActiveIntoView(): void {
    const index = this.markedCatalogIndex();
    if (index < 0) {
      return;
    }
    queueMicrotask(() => {
      const row = this.catalogListRef?.nativeElement?.querySelector<HTMLElement>(
        `[data-catalog-index="${index}"]`,
      );
      row?.scrollIntoView({ block: 'nearest' });
    });
  }

  onCatalogRow(index: number, product: any): void {
    if (this.searchTerm().trim()) {
      this.catalogActiveIndex.set(index);
    }
    if (!this.canAddToCart(product)) {
      return;
    }
    this.addProductToCart(product);
  }

  private isTypingTarget(target: EventTarget | null): boolean {
    const el = target as HTMLElement | null;
    if (!el) {
      return false;
    }
    const tag = el.tagName;
    return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || el.isContentEditable;
  }

  openCajaQueue(): void {
    this.shortcutsOpen.set(false);
    this.cajaQueueOpen.set(true);
    this.loadCajaQueue();
  }

  loadCajaQueue(): void {
    if (this.isCobranzaTerminal()) {
      return;
    }
    if (this.cajaQueue().length === 0) {
      this.loadingCajaQueue.set(true);
    }
    this.posService.getSalesAwaitingCaja().subscribe({
      next: ({ sales_in_caja }) => {
        const rows = sales_in_caja ?? [];
        this.cajaQueue.set(rows);
        if (!rows.some((row) => row.id === this.cajaExpandedId())) {
          this.cajaExpandedId.set(null);
        }
        this.loadingCajaQueue.set(false);
      },
      error: (error) => {
        this.loadingCajaQueue.set(false);
        this.notifyError(
          mapPosApiErrorMessage(error?.error?.message) || 'No se pudieron cargar las ventas en caja',
        );
      },
    });
  }

  openCajaCard(id: string): void {
    this.cajaExpandedId.set(id);
  }

  closeCajaCard(): void {
    this.cajaExpandedId.set(null);
  }

  expandedCajaTicket(): PosCajaQueueTicket | null {
    const id = this.cajaExpandedId();
    if (!id) {
      return null;
    }
    return this.cajaQueue().find((row) => row.id === id) ?? null;
  }

  cajaTicketName(ticket: PosCajaQueueTicket): string {
    const customer = ticket.customer;
    if (!customer || customer.is_walk_in) {
      return ticket.walk_in_name?.trim() || 'Público en General';
    }
    return (
      customer.display_name ||
      [customer.name, customer.lastname].filter(Boolean).join(' ').trim() ||
      customer.company_name ||
      'Cliente'
    );
  }

  cajaLineCount(ticket: PosCajaQueueTicket): number {
    return ticket.lines?.length ?? 0;
  }

  cajaPieceCount(ticket: PosCajaQueueTicket): number {
    return (ticket.lines ?? []).reduce((sum, line) => sum + (Number(line.quantity) || 0), 0);
  }

  cajaProductLabel(ticket: PosCajaQueueTicket): string {
    const lines = this.cajaLineCount(ticket);
    const pieces = this.cajaPieceCount(ticket);
    if (!lines) {
      return 'Sin productos';
    }
    const lineLabel = lines === 1 ? '1 producto' : `${lines} productos`;
    if (pieces > 0 && pieces !== lines) {
      return `${lineLabel} · ${this.formatStock(pieces)} pzas`;
    }
    return lineLabel;
  }

  cajaSellerName(ticket: PosCajaQueueTicket): string {
    const seller = ticket.seller_user;
    return [seller?.first_name, seller?.last_name].filter(Boolean).join(' ').trim();
  }

  cajaWhen(ticket: PosCajaQueueTicket): string {
    const when = formatBusinessDateTime(ticket.created_at);
    if (!when) {
      return '';
    }
    return `${when.date}, ${when.time}`;
  }

  cajaMoney(amount: number | string | null | undefined, ticket: PosCajaQueueTicket): string {
    return formatUnitCurrency(amount, ticket.currency === 'USD' ? 'USD' : 'MXN');
  }

  cajaHasAmount(value: number | string | null | undefined): boolean {
    return Math.abs(Number(value) || 0) > 0.009;
  }

  recallCajaTicket(ticket: PosCajaQueueTicket): void {
    if (!ticket?.id || this.recallingId()) {
      return;
    }
    const folio = ticket.folio || ticket.id;
    this.askPosConfirm({
      title: 'Regresar a ventas',
      message: `¿Regresar ${folio} a ventas? Sale de POS Caja.`,
      note: ticket.caja_open
        ? 'Caja la tiene abierta. Se le va a quitar y verá que Ventas la regresó.'
        : undefined,
      cancelLabel: 'Cancelar',
      acceptLabel: 'Regresar a ventas',
    }).subscribe((confirmed) => {
      if (!confirmed || !ticket.id || this.recallingId()) {
        return;
      }
      this.runCajaRecall(ticket);
    });
  }

  private runCajaRecall(ticket: PosCajaQueueTicket): void {
    const folio = ticket.folio || ticket.id;
    this.recallingId.set(ticket.id);
    const sellerId = this.posState.seller()?.id;
    const request$ = ticket.kind === 'advance'
      ? this.posService.recallQuotationFromCaja(ticket.id, sellerId)
      : this.posService.recallSaleFromCaja(ticket.id, sellerId);
    request$.subscribe({
      next: (response) => {
        this.recallingId.set(null);
        this.cajaQueueOpen.set(false);
        const note = response?.caja_was_open
          ? `${folio} volvió a ventas. Caja la tenía abierta y se le quitó.`
          : `${folio} volvió a ventas.`;
        this.notifySuccess(note, 5000);
        this.posService.getSalesInProgress().subscribe({
          next: ({ sales_in_progress }) => {
            this.salesInProgress.set(sales_in_progress ?? []);
            const loaded = (sales_in_progress ?? []).find((item) => item.id === ticket.id);
            if (loaded) {
              this.openReturnedTicket(loaded);
            }
          },
        });
        this.loadCajaQueue();
      },
      error: (error) => {
        this.recallingId.set(null);
        this.notifyError(mapPosApiErrorMessage(error?.error?.message) || 'No se pudo regresar el folio', 5000);
        this.loadCajaQueue();
      },
    });
  }

  private persistEditingCustomer(): void {
    const id = this.editingSaleId();
    if (!id) {
      return;
    }
    const customerId = this.selectedOrderCustomerId();
    if (this.editingTicketKind() === 'advance') {
      if (customerId == null || customerId === '') {
        this.notifyError('El anticipo necesita un cliente del catálogo');
        return;
      }
      this.posService.updateQuotationCustomer(id, { customer_id: customerId }).subscribe({
        error: (error) => {
          this.notifyError(mapPosApiErrorMessage(error?.error?.message) || 'No se pudo cambiar el cliente');
        },
      });
      return;
    }
    this.posService.updateSaleCustomer(id, {
      customer_id: customerId ?? null,
      walk_in_name: this.walkInName(),
      walk_in_rfc: this.walkInRfc(),
    }).subscribe({
      error: (error) => {
        this.notifyError(mapPosApiErrorMessage(error?.error?.message) || 'No se pudo cambiar el cliente');
      },
    });
  }

  changeBranch(): void {
    this.slotsReady.set(false);
    this.persistActiveSlotNow();
    this.posBranchSession.pickBranch({ required: false }).subscribe({
      next: (branchId) => {
        if (!branchId) {
          this.slotsReady.set(true);
          return;
        }
        this.posService.clearCart();
        this.resetCustomerSelection();
        this.clearEditingTicket();
        resetPosWarehouseForBranch(branchId);
        this.catalogWarehouseId.set('');
        this.syncBrowseBranches(branchId);
        const fiscal = this.authService.getFiscalConfigurationId();
        if (fiscal) {
          this.posState.fiscalConfigurationId.set(fiscal);
        }
        this.posState.setDailyShift(null);
        this.refreshDailyShift(() => this.notifyBranchSwitchResult(), branchId);
        this.loadCartSlots();
        this.loadProducts(this.searchTerm());
        this.loadSalesInProgress();
      },
      error: (error) => {
        this.slotsReady.set(true);
        this.notifyError(
          mapPosApiErrorMessage(resolveHttpErrorMessage(error, 'No se pudo cambiar la sucursal')),
          5000
        );
      },
    });
  }

  loadData(): void {
    this.refreshDailyShift();
    this.loadSalesInProgress();
  }

  refreshFromHeader(): void {
    if (this.loadingTickets() || this.loading() || this.posState.checkingShift()) {
      return;
    }
    this.loadData();
    if (this.posState.seller()) {
      this.loadProducts(this.searchTerm());
    }
  }

  loadSalesInProgress(): void {
    if (this.isCobranzaTerminal()) {
      return;
    }
    this.loadCajaQueue();
    this.loadingTickets.set(true);
    this.posService.getSalesInProgress().subscribe({
      next: ({ sales_in_progress }) => {
        this.salesInProgress.set(sales_in_progress ?? []);
        this.loadingTickets.set(false);
        this.afterTicketsLoaded();
      },
      error: (error) => {
        this.loadingTickets.set(false);
        this.notifyError(
          mapPosApiErrorMessage(error?.error?.message) || 'No se pudieron cargar los tickets en ventas',
          5000,
        );
      },
    });
  }

  private afterTicketsLoaded(): void {
    this.tryResumeReturnedTicket();
  }

  private tryResumeReturnedTicket(): boolean {
    const resumeId = this.pendingResumeTicketId;
    if (!resumeId || !this.canSell()) {
      return false;
    }
    const ticket = this.salesInProgress().find((item) => item.id === resumeId);
    if (!ticket) {
      this.pendingResumeTicketId = null;
      this.notifyInfo('Ese folio ya no está en ventas. Búscalo en Folios.');
      return false;
    }
    this.pendingResumeTicketId = null;
    this.openReturnedTicket(ticket);
    void this.router.navigate([], {
      queryParams: { ticket: null },
      queryParamsHandling: 'merge',
      replaceUrl: true,
    });
    return true;
  }

  openReturnedTicket(ticket: PosSaleInProgress): void {
    if (!ticket?.id) {
      return;
    }
    if (this.editingSaleId() && this.editingSaleId() !== ticket.id) {
      this.notifyInfo('Termina el ticket que tienes abierto.');
      return;
    }
    this.ticketSlotAsk.set(ticket);
  }

  confirmTicketSlot(slot: PosCartSlotId): void {
    const ticket = this.ticketSlotAsk();
    if (!ticket) return;
    this.ticketSlotAsk.set(null);
    if (slot !== this.activeCartSlot()) {
      this.switchCartSlot(slot);
    }
    this.applyReturnedTicket(ticket);
  }

  advanceGap(): number {
    if (!this.editingAdvanceCollected()) return 0;
    const paid = Number(this.editingAdvanceAmount() ?? 0);
    const sale = Number(this.posService.cart().grand_total || 0);
    return Math.round((paid - sale) * 100) / 100;
  }

  openAdvancePdf(): void {
    const quotationId = this.editingQuotationId();
    if (!quotationId || this.pdfBusy()) return;
    const known = this.editingAdvanceInvoiceId();
    if (known) {
      this.fetchAdvancePdf(quotationId, known);
      return;
    }
    this.pdfBusy.set('advance');
    this.quotations.getDetail(quotationId).subscribe({
      next: (detail) => {
        const invoiceId = detail.header?.advance_invoice?.id ?? null;
        if (!invoiceId) {
          this.pdfBusy.set('');
          this.notifyError('Esa cotización no tiene PDF de anticipo');
          return;
        }
        this.editingAdvanceInvoiceId.set(invoiceId);
        this.fetchAdvancePdf(quotationId, invoiceId);
      },
      error: (error: unknown) => {
        this.pdfBusy.set('');
        this.notifyError(resolveHttpErrorMessage(error, 'No se pudo abrir el PDF del anticipo'));
      },
    });
  }

  openQuotationPdf(): void {
    const quotationId = this.editingQuotationId();
    if (!quotationId || this.pdfBusy()) return;
    this.pdfBusy.set('quote');
    this.quotations.getDetail(quotationId).subscribe({
      next: (detail) => {
        this.pdfBusy.set('');
        this.openDocumentPath(
          detail.documents?.find((doc) => doc.document_type_name === 'DOCUMENTO_ORIGINAL')?.path,
          'El PDF de la cotización aún se está generando.',
        );
      },
      error: (error: unknown) => {
        this.pdfBusy.set('');
        this.notifyError(resolveHttpErrorMessage(error, 'No se pudo abrir la cotización'));
      },
    });
  }

  openSalePdf(): void {
    const orderId = this.editingTicketKind() === 'sale' ? this.editingSaleId() : null;
    if (!orderId || this.pdfBusy()) return;
    this.pdfBusy.set('sale');
    this.salesOrders.getOrderDetailById(orderId).subscribe({
      next: (detail) => {
        this.pdfBusy.set('');
        this.openDocumentPath(
          detail.documents?.find((doc) => doc.document_type_name === 'DOCUMENTO_ORIGINAL')?.path,
          'El PDF de la orden aún se está generando.',
        );
      },
      error: (error: unknown) => {
        this.pdfBusy.set('');
        this.notifyError(resolveHttpErrorMessage(error, 'No se pudo abrir la orden'));
      },
    });
  }

  private fetchAdvancePdf(quotationId: string, invoiceId: string): void {
    this.pdfBusy.set('advance');
    this.quotations.getAdvancePdf(quotationId, invoiceId).subscribe({
      next: (response) => {
        this.pdfBusy.set('');
        this.openDocumentPath(response.signedUrl, 'No se recibió el PDF del anticipo');
      },
      error: (error: unknown) => {
        this.pdfBusy.set('');
        this.notifyError(resolveHttpErrorMessage(error, 'No se pudo abrir el PDF del anticipo'));
      },
    });
  }

  private openDocumentPath(path: string | null | undefined, missing: string): void {
    const url = String(path ?? '').trim();
    if (!url) {
      this.notifyError(missing);
      return;
    }
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  private applyReturnedTicket(ticket: PosSaleInProgress): void {
    const collected = !!ticket.advance_collected;
    const lines = (ticket.line_items ?? [])
      .filter((line) => !collected || line.product_sku !== ADVANCE_CONCEPT_SKU)
      .map((line) => this.posService.recalculateItem(mapInProgressLineToCartItem(line)));
    this.posService.replaceCart(lines, ticket.global_discount ?? null);
    this.editingSaleId.set(ticket.id);
    this.editingFolio.set(ticket.folio || ticket.id);
    this.editingTicketKind.set(ticket.kind === 'advance' ? 'advance' : 'sale');
    this.editingAdvanceAmount.set(
      collected || ticket.kind === 'advance' ? Number(ticket.amount_pending ?? 0) || null : null,
    );
    this.editingQuotationId.set(collected ? ticket.quotation_id || ticket.id : null);
    this.editingQuotationFolio.set(collected ? ticket.quotation_folio || ticket.folio || null : null);
    this.editingAdvanceInvoiceId.set(null);
    this.editingAdvanceUsoCfdi.set(ticket.advance_uso_cfdi ?? null);
    this.editingAdvanceMetodoPago.set(ticket.advance_metodo_pago ?? null);
    this.editingAdvanceCollected.set(collected);
    this.editingAdvanceEnvironment.set(
      ticket.advance_stamp_environment === 'demo' || ticket.advance_stamp_environment === 'production'
        ? ticket.advance_stamp_environment
        : null,
    );
    this.editingForShipping.set(
      ticket.for_shipping === true || ticket.for_shipping === 1 || ticket.for_shipping === '1',
    );
    this.editingNotes.set(ticket.kind === 'advance' ? '' : posSaleObservation(ticket.notes));
    const folio = ticket.folio || ticket.id;
    const paid = Number(ticket.amount_pending ?? 0);
    this.notifySuccess(
      collected
        ? `${folio} cargado. Anticipo cobrado ${this.formatCurrency(paid)}. Agrega los productos y registra la venta.`
        : ticket.kind === 'advance'
          ? `${folio} cargado. Corrige el anticipo y pulsa Enviar a caja.`
          : `${folio} cargado. Edita y pulsa Enviar a caja.`,
      4500,
    );

    if (ticket.customer?.is_walk_in || ticket.customer_id == null) {
      this.clearSelectedCustomer();
      this.walkInName.set(ticket.walk_in_name ?? '');
      this.walkInRfc.set(ticket.walk_in_rfc ?? '');
      this.walkInTicketOpen.set(false);
    } else {
      this.walkInName.set('');
      this.walkInRfc.set('');
      this.walkInTicketOpen.set(false);
      const nameParts = [ticket.customer?.name, ticket.customer?.lastname]
        .filter(Boolean)
        .join(' ')
        .trim();
      const company = String(ticket.customer.company_name ?? '').trim();
      this.selectedCustomerId.set(String(ticket.customer.id ?? ticket.customer_id));
      this.selectedOrderCustomerId.set(ticket.customer_id);
      this.selectedCustomerName.set(
        company
          ? !nameParts || nameParts.toLowerCase() === company.toLowerCase()
            ? company
            : `${nameParts} · ${company}`
          : nameParts || 'Cliente'
      );
    }

    for (const item of this.posService.cart().items) {
      this.hydrateCartItemPricing(item.product_id, item.product_uom_id);
    }
  }

  private clearEditingTicket(): void {
    this.editingSaleId.set(null);
    this.editingFolio.set(null);
    this.editingTicketKind.set('sale');
    this.editingAdvanceAmount.set(null);
    this.editingAdvanceUsoCfdi.set(null);
    this.editingAdvanceMetodoPago.set(null);
    this.editingAdvanceCollected.set(false);
    this.editingAdvanceEnvironment.set(null);
    this.editingQuotationId.set(null);
    this.editingQuotationFolio.set(null);
    this.editingAdvanceInvoiceId.set(null);
    this.pdfBusy.set('');
    this.editingForShipping.set(false);
    this.editingNotes.set('');
  }

  cartSlotBadges(): Array<{ id: PosCartSlotId; count: number; active: boolean }> {
    const snap = this.cartSlots.snapshot();
    const active = this.activeCartSlot();
    const liveCount =
      this.slotsReady() && !this.editingSaleId() ? this.posService.cart().items.length : null;
    return ([1, 2, 3] as const).map((id) => ({
      id,
      active: id === active,
      count: id === active && liveCount != null ? liveCount : snap.slots[id].lines.length,
    }));
  }

  switchCartSlot(slot: PosCartSlotId): void {
    if (this.editingSaleId() || slot === this.activeCartSlot()) {
      return;
    }
    // El reprecio del carrito que dejas no puede caer en el que abres.
    this.cancelSlotReprice();
    this.slotsReady.set(false);
    this.persistActiveSlotNow();
    this.activeCartSlot.set(slot);
    const key = this.slotScopeKey();
    if (key) {
      this.cartSlots.setActive(key, slot);
    }
    const state = this.cartSlots.snapshot().slots[slot];
    this.applySlotContents(state);
    this.slotsReady.set(true);
  }

  openFolios(): void {
    if (this.editingSaleId()) {
      this.notifyInfo('Termina o suelta el ticket de caja antes de usar otro carrito.');
      return;
    }
    const branchId = this.authService.getBillingBranchId();
    const fiscalId = this.posState.fiscalConfigurationId() || this.authService.getFiscalConfigurationId();
    if (!branchId || !fiscalId) {
      this.notifyError('Falta la sucursal o la razón social de la sesión.');
      return;
    }
    this.dialog
      .open(PosFoliosDialogComponent, {
        width: '760px',
        maxWidth: '96vw',
        maxHeight: '90vh',
        panelClass: 'pos-dialog-panel',
        autoFocus: 'first-tabbable',
        data: {
          mode: 'ventas',
          branchId,
          branchLabel: this.branchLabel(),
          fiscalConfigurationId: fiscalId,
          hasOpenShift: true,
          slots: this.cartSlotBadges(),
        },
      })
      .afterClosed()
      .subscribe((pick: PosFolioCartPick | undefined) => {
        if (pick) {
          this.placeFolioInSlot(pick);
        }
      });
  }

  private loadCartSlots(): void {
    const key = this.slotScopeKey();
    if (!key) {
      return;
    }
    this.cancelSlotReprice();
    this.slotsReady.set(false);
    const snap = this.cartSlots.bind(key);
    this.activeCartSlot.set(snap.active);
    this.applySlotContents(snap.slots[snap.active]);
    this.slotsReady.set(true);
  }

  private placeFolioInSlot(pick: PosFolioCartPick): void {
    if (this.editingSaleId()) {
      this.notifyInfo('Termina o suelta el ticket de caja antes de usar otro carrito.');
      return;
    }
    this.cancelSlotReprice();
    this.slotsReady.set(false);
    this.persistActiveSlotNow();
    this.activeCartSlot.set(pick.slot);
    const key = this.slotScopeKey();
    if (key) {
      this.cartSlots.setActive(key, pick.slot);
    }
    this.applySlotContents({
      customerId: pick.customerId,
      customerName: pick.customerName,
      walkInName: pick.walkInName,
      walkInRfc: pick.walkInRfc,
      globalDiscountId: null,
      lines: pick.lines,
    });
    if (pick.advance) {
      this.editingSaleId.set(pick.advance.documentId);
      this.editingFolio.set(pick.folio);
      this.editingTicketKind.set(pick.advance.kind);
      this.editingAdvanceAmount.set(pick.advance.paid);
      this.editingAdvanceCollected.set(true);
      this.editingAdvanceEnvironment.set(pick.advance.environment);
      this.editingQuotationId.set(pick.advance.quotationId);
      this.editingQuotationFolio.set(pick.advance.quotationFolio);
      this.editingAdvanceInvoiceId.set(pick.advance.invoiceId);
    } else {
      this.editingAdvanceInvoiceId.set(null);
    }
    this.slotsReady.set(true);
    this.landedSlot.set(pick.slot);
    if (this.landedTimer) clearTimeout(this.landedTimer);
    this.landedTimer = setTimeout(() => this.landedSlot.set(null), 900);
    this.notifyInfo(
      pick.advance
        ? `${pick.advance.quotationFolio} en C${pick.slot}. Anticipo ${this.formatCurrency(pick.advance.paid)}.`
        : `${pick.folio} en C${pick.slot}. Se cobra el precio vigente.`,
      3500,
    );
  }

  private restoreParkedSlot(): void {
    this.cancelSlotReprice();
    this.slotsReady.set(false);
    this.clearEditingTicket();
    this.resetCustomerSelection();
    const snap = this.cartSlots.snapshot();
    this.activeCartSlot.set(snap.active);
    this.applySlotContents(snap.slots[snap.active]);
    this.slotsReady.set(true);
  }

  private applySlotContents(state: PosCartSlotState): void {
    this.resetCustomerSelection();
    if (state.customerId) {
      this.selectedCustomerId.set(state.customerId);
      this.selectedOrderCustomerId.set(state.customerId);
      this.selectedCustomerName.set(state.customerName || 'Cliente');
    } else {
      this.walkInName.set(state.walkInName || '');
      this.walkInRfc.set(state.walkInRfc || '');
    }
    const placeholders = state.lines.map((line) =>
      this.posService.recalculateItem(
        mapInProgressLineToCartItem({
          product_id: line.productId,
          product_name: line.productName,
          product_sku: line.productSku,
          product_uom_id: line.productUomId,
          uom_name: line.uomName,
          quantity: line.quantity,
          // El anticipo marca edición antes de que responda el catálogo. Sin este precio la línea se queda en 0.
          unit_price: Number(line.documentUnitPrice ?? 0),
          iva_percentage: line.documentUnitPrice != null ? this.saleIvaPercent() : 0,
          discount_percentage: line.priceDiscountPercentage,
          product_discount_id: line.priceDiscountPercentage ? null : line.productDiscountId,
        }),
      ),
    );
    this.pendingGlobalDiscountId = state.globalDiscountId;
    this.posService.replaceCart(placeholders, null);
    this.tryApplyPendingGlobalDiscount();
    this.repriceSlotLines(state.lines);
  }

  private cancelSlotReprice(): void {
    this.repriceToken += 1;
    this.repriceSub?.unsubscribe();
    this.repriceSub = null;
  }

  private repriceSlotLines(lines: PosCartSlotLine[]): void {
    this.cancelSlotReprice();
    if (!lines.length) {
      return;
    }
    const token = this.repriceToken;
    const slot = this.activeCartSlot();
    this.repriceSub = forkJoin(
      lines.map((line) =>
        this.posService
          .getPosInventorySummary({
            product_id: line.productId,
            warehouse_id: this.catalogWarehouseId() || undefined,
            billing_branch_id: this.authService.getBillingBranchId() || undefined,
            limit: 20,
          })
          .pipe(catchError(() => of(null))),
      ),
    ).subscribe((results) => {
      if (
        !acceptSlotReprice(
          { token, slot },
          { token: this.repriceToken, slot: this.activeCartSlot(), editing: Boolean(this.editingSaleId()) },
        )
      ) {
        return;
      }
      if (results.every((summary) => summary == null)) {
        return;
      }
      const notices: string[] = [];
      const items: POSCartItem[] = [];
      const currentItems = this.posService.cart().items;
      results.forEach((summary, index) => {
        const line = lines[index];
        if (summary == null) {
          const existing = currentItems[index];
          if (existing && existing.product_id === line.productId) {
            items.push(existing);
          }
          return;
        }
        const rows = (summary.data ?? []) as Array<Record<string, unknown>>;
        const row = rows.find((candidate) => {
          const productId = String(candidate['product_id'] || candidate['id'] || '');
          const uomId = String(candidate['product_uom_id'] || candidate['uom_id'] || '');
          return productId === line.productId && uomId === line.productUomId;
        });
        const label = line.productName || 'Un producto';
        if (!row) {
          notices.push(`${label} ya no está en el catálogo`);
          return;
        }
        const product = {
          ...row,
          id: row['product_id'] || row['id'],
          name: row['product_name'] || row['name'] || label,
          sku: row['product_sku'] || row['sku'] || line.productSku || '',
          product_uom_id: line.productUomId,
          uom_name: row['uom_name'] || line.uomName || 'Pieza',
          suggested_unit_price: Number(row['suggested_unit_price'] ?? row['cost'] ?? 0),
          total_available_quantity: Number(row['total_available_quantity'] ?? row['available_quantity'] ?? 0),
          applicable_discounts: Array.isArray(row['applicable_discounts']) ? row['applicable_discounts'] : [],
        };
        const discounts = product.applicable_discounts as PosApplicableDiscount[];
        const priceDiscount = Number(line.priceDiscountPercentage ?? 0);
        const discount =
          priceDiscount > 0 || !line.productDiscountId
            ? null
            : discounts.find((item) => item.id === line.productDiscountId) ?? null;
        if (line.productDiscountId && priceDiscount <= 0 && !discount) {
          notices.push(`${product.name}: el descuento ya no aplica`);
        }
        let item = this.buildCartItem(product, {
          quantity: line.quantity,
          product_discount_id: discount?.id ?? null,
          selected_discount: discount,
        });
        const options = Array.isArray(item.pricing_options) ? item.pricing_options : [];
        const wanted = line.priceListId || '';
        const match = wanted
          ? options.find((option) => String(option.price_list_id) === wanted)
          : undefined;
        const chosen = match ?? options[0];
        if (wanted && !match && chosen) {
          notices.push(`${product.name}: la lista anterior ya no aplica`);
        }
        const catalogPrice = Number(chosen?.price ?? product.suggested_unit_price ?? 0);
        const quotedPrice = line.documentUnitPrice;
        const unitPrice =
          Number.isFinite(catalogPrice) && catalogPrice > 0 ? catalogPrice : Number(quotedPrice ?? 0);
        if (!Number.isFinite(unitPrice) || unitPrice <= 0) {
          notices.push(`${product.name} no tiene precio vigente`);
          const existing = currentItems[index];
          if (existing && existing.product_id === line.productId && existing.unit_price > 0) {
            items.push(existing);
          }
          return;
        }
        const documentPrice = line.documentUnitPrice;
        if (documentPrice != null && Math.abs(documentPrice - unitPrice) > 0.009) {
          notices.push(`${product.name}: el precio cambió`);
        }
        item = this.posService.recalculateItem({
          ...item,
          unit_price: unitPrice,
          iva_percentage: this.saleIvaPercent(),
          ieps_percentage: 0,
          selected_price_list_id: chosen ? String(chosen.price_list_id) : '',
          price_discount_percentage: priceDiscount > 0 ? priceDiscount : 0,
          product_discount_id: priceDiscount > 0 ? null : discount?.id ?? null,
          selected_discount: priceDiscount > 0 ? null : discount,
          without_inventory: product.total_available_quantity <= 0,
        });
        items.push(item);
      });
      const globalId = this.pendingGlobalDiscountId ?? this.posService.cart().global_discount_id;
      this.slotsReady.set(false);
      this.posService.replaceCart(items);
      this.pendingGlobalDiscountId = globalId;
      this.tryApplyPendingGlobalDiscount(notices);
      this.slotsReady.set(true);
      if (notices.length) {
        this.notifyInfo(notices.slice(0, 3).join('. '), 5000);
      }
    });
  }

  private tryApplyPendingGlobalDiscount(notices?: string[]): void {
    const id = this.pendingGlobalDiscountId;
    if (!id) {
      return;
    }
    if (this.loadingGlobalDiscounts()) {
      return;
    }
    const discount = this.applicableGlobalDiscounts().find((item) => item.id === id) ?? null;
    this.pendingGlobalDiscountId = null;
    if (!discount) {
      if (this.canUseGlobalDiscounts()) {
        if (notices) {
          notices.push('El descuento de la orden ya no aplica');
        } else {
          this.notifyInfo('El descuento de la orden ya no aplica');
        }
      }
      return;
    }
    this.posService.setGlobalDiscount(discount);
  }

  private persistActiveSlotNow(): void {
    if (this.editingSaleId()) {
      return;
    }
    const key = this.slotScopeKey();
    if (!key) {
      return;
    }
    const cart = this.posService.cart();
    const customerId = this.selectedCustomerId();
    const orderCustomerId = this.selectedOrderCustomerId();
    this.cartSlots.writeSlot(key, this.activeCartSlot(), {
      customerId: customerId || (orderCustomerId != null ? String(orderCustomerId) : null),
      customerName: this.selectedCustomerName(),
      walkInName: this.walkInName(),
      walkInRfc: this.walkInRfc(),
      globalDiscountId: cart.global_discount_id,
      lines: cart.items.map((item) => this.lineIdentity(item)),
    });
  }

  private lineIdentity(item: POSCartItem): PosCartSlotLine {
    return {
      productId: item.product_id,
      productUomId: item.product_uom_id,
      quantity: item.quantity,
      priceListId: item.selected_price_list_id || null,
      productDiscountId: item.product_discount_id ?? null,
      priceDiscountPercentage: item.price_discount_percentage || 0,
      productName: item.product_name,
      productSku: item.product_sku,
      uomName: item.uom_name,
    };
  }

  private slotScopeKey(): string {
    const userId = this.authService.user_info?.sub || '';
    const branchId = this.authService.getBillingBranchId() || '';
    const fiscalId = this.posState.fiscalConfigurationId() || this.authService.getFiscalConfigurationId() || '';
    if (!userId || !branchId || !fiscalId) {
      return '';
    }
    return `${userId}:${branchId}:${fiscalId}`;
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

  refreshDailyShift(onDone?: () => void, billingBranchId?: string | null): void {
    const branchId = billingBranchId ?? this.authService.getBillingBranchId();
    this.posState.checkingShift.set(true);
    this.posService.getCurrentDailyShift(branchId).subscribe({
      next: (response) => {
        const forActiveBranch = this.posState.applyCurrentDailyShift(response, branchId);
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
        `${name}: hay un corte de otro día. Caja debe cerrarlo. Las ventas quedan en cola.`,
        6500
      );
      return;
    }
    if (this.posState.shiftOpen()) {
      this.notifySuccess(`${name}: corte abierto. Las ventas van a caja.`, 4000);
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
          this.loadSalesInProgress();
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
    const next = term ?? '';
    if (next !== this.searchTerm()) {
      this.catalogActiveIndex.set(-1);
    }
    this.searchTerm.set(next);
    this.searchInput$.next(next);
  }

  catalogWarehouses() {
    return this.lastInventorySummary()?.warehouses ?? [];
  }

  onWarehouseFilter(warehouseId: string): void {
    const nextId = String(warehouseId ?? '').trim();
    if (nextId === this.catalogWarehouseId()) {
      return;
    }
    this.catalogWarehouseId.set(nextId);
    this.loadProducts(this.searchTerm());
  }

  toggleCatalogFilters(event: Event): void {
    event.stopPropagation();
    this.catalogFiltersOpen.update((open) => !open);
  }

  clearSearch(): void {
    if (!this.searchTerm()) {
      this.catalogSearchRef?.nativeElement.focus();
      return;
    }
    this.catalogActiveIndex.set(-1);
    this.addHighlightedOnNextResults = false;
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
      if (this.catalogView() === 'branches') {
        this.loadBranchTable(term);
      }
      return;
    }

    const raw = term.trim();
    const exact = raw.endsWith('!');
    const normalized = (exact ? raw.slice(0, -1) : raw).trim().toLowerCase();
    if (!normalized) {
      this.publishFiltered(exact ? [] : this.products(), exact ? term : '');
      return;
    }

    const filtered = this.products().filter((p) => {
      const sku = String(p.sku ?? '').toLowerCase();
      const externalSku = String(p.external_sku ?? '').toLowerCase();
      if (exact) {
        return sku === normalized || externalSku === normalized;
      }
      return p.name.toLowerCase().includes(normalized) || sku.includes(normalized);
    });
    this.publishFiltered(filtered, term);
  }

  private publishFiltered(rows: any[], search: string): void {
    this.filteredProducts.set(rows);
    const term = search.trim();
    const pendingAdd = this.addHighlightedOnNextResults;
    if (!term || rows.length === 0) {
      this.catalogActiveIndex.set(-1);
      if (search === this.searchTerm()) {
        this.addHighlightedOnNextResults = false;
      }
      return;
    }
    if (this.catalogActiveIndex() < 0 || this.catalogActiveIndex() >= rows.length) {
      this.catalogActiveIndex.set(0);
      this.scrollCatalogActiveIntoView();
    }
    if (pendingAdd && search === this.searchTerm()) {
      this.addHighlightedOnNextResults = false;
      const picked = rows[this.catalogActiveIndex()] ?? rows[0];
      if (picked && this.canAddToCart(picked)) {
        this.addProductToCart(picked);
      }
    }
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
          fiscalConfigurationId: this.posState.fiscalConfigurationId() || undefined,
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

  catalogCardTrack(product: any): string {
    return `${product?.id || product?.product_id || ''}:${product?.product_uom_id || product?.uom_id || ''}`;
  }

  catalogUomLabel(product: any): string {
    const label = String(product?.uom_name || product?.uom_abbreviation || '').trim();
    return label || 'Pieza';
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
    this.notifySuccess(
      cartItem.without_inventory
        ? `${cartItem.product_name} agregado sin inventario`
        : `${cartItem.product_name} agregado`,
      2000,
    );
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
      iva_percentage: this.saleIvaPercent(),
      ieps_percentage: 0,
      subtotal: 0,
      line_gross_subtotal: 0,
      line_discount_amount: 0,
      price_discount_percentage: 0,
      price_discount_amount: 0,
      iva_amount: 0,
      ieps_amount: 0,
      line_total: 0,
      product_discount_id: selection.product_discount_id,
      selected_discount: selection.selected_discount,
      pricing_options: normalizePosPricingOptions(collectPosPricingOptions(product)),
      selected_price_list_id: '',
      suggested_unit_price: Number(product.suggested_unit_price ?? product.cost ?? 0),
      suggested_iva_percentage: Number(product.suggested_iva_percentage ?? 8),
      suggested_ieps_percentage: Number(product.suggested_ieps_percentage ?? 0),
      applicable_discounts: Array.isArray(product.applicable_discounts) ? product.applicable_discounts : [],
      without_inventory: Number(product.total_available_quantity ?? 0) <= 0,
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
    const open = this.priceDiscountOpenIndex();
    if (open === index) {
      this.priceDiscountOpenIndex.set(null);
    } else if (open != null && open > index) {
      this.priceDiscountOpenIndex.set(open - 1);
    }
    this.posService.removeItem(index);
  }

  @HostListener('document:click', ['$event'])
  closePriceDiscountOnOutside(event: MouseEvent): void {
    const target = event.target;
    if (this.priceDiscountOpenIndex() != null) {
      if (!(target instanceof Element) || !target.closest('.pos-line__off')) {
        this.priceDiscountOpenIndex.set(null);
      }
    }
    if (!this.catalogFiltersOpen()) return;
    if (target instanceof Element && target.closest('.pos-filters')) return;
    this.catalogFiltersOpen.set(false);
  }

  togglePriceDiscount(index: number, event?: Event): void {
    if (!this.canApplyPriceDiscount()) return;
    const opening = this.priceDiscountOpenIndex() !== index;
    this.priceDiscountOpenIndex.set(opening ? index : null);
    if (!opening) return;
    const button = event?.currentTarget instanceof HTMLElement ? event.currentTarget : null;
    if (button) this.placePriceDiscountPopover(button);
    const item = this.posService.cart().items[index];
    const pct = Number(item?.price_discount_percentage ?? 0);
    const isPreset = Math.abs(pct - 5) < 0.001 || Math.abs(pct - 3) < 0.001;
    this.customPriceDiscount.set(pct > 0 && !isPreset ? String(pct) : '');
  }

  private placePriceDiscountPopover(button: HTMLElement): void {
    const scroller = button.closest('.pos-cart__lines');
    const limit = scroller instanceof HTMLElement ? scroller.getBoundingClientRect() : null;
    const buttonBox = button.getBoundingClientRect();
    if (!limit) {
      this.priceDiscountDropUp.set(false);
      this.priceDiscountAlignEnd.set(false);
      return;
    }
    const spaceBelow = limit.bottom - buttonBox.bottom;
    const spaceAbove = buttonBox.top - limit.top;
    this.priceDiscountDropUp.set(spaceBelow < 52 && spaceAbove > spaceBelow);
    this.priceDiscountAlignEnd.set(limit.right - buttonBox.left < 230);
  }

  applyPriceDiscount(index: number, percent: number): void {
    if (!this.canApplyPriceDiscount()) return;
    const item = this.posService.cart().items[index];
    if (!item) return;
    const current = Number(item.price_discount_percentage ?? 0);
    const next = Math.abs(current - percent) < 0.001 ? 0 : percent;
    this.posService.updateItemPriceDiscount(index, next);
  }

  applyCustomPriceDiscount(index: number): void {
    if (!this.canApplyPriceDiscount()) return;
    const raw = String(this.customPriceDiscount() ?? '').trim().replace(',', '.');
    const pct = Number(raw);
    if (!raw || !Number.isFinite(pct) || pct <= 0 || pct > 100) {
      this.notifyError('El descuento debe estar entre 0.01% y 100%', 3500);
      return;
    }
    this.posService.updateItemPriceDiscount(index, normalizePriceDiscountPercent(pct));
  }

  clearPriceDiscount(index: number): void {
    this.customPriceDiscount.set('');
    this.posService.updateItemPriceDiscount(index, 0);
  }

  hasPriceDiscount(item: POSCartItem): boolean {
    return Number(item.price_discount_percentage ?? 0) > 0.009;
  }

  isPriceDiscountPreset(item: POSCartItem, percent: number): boolean {
    return Math.abs(Number(item.price_discount_percentage ?? 0) - percent) < 0.001;
  }

  formatPriceDiscount(percent: number | string | null | undefined): string {
    const n = Number(percent);
    if (!Number.isFinite(n)) return '0';
    return n.toLocaleString('es-MX', { maximumFractionDigits: 2 });
  }

  priceDiscountPercent(line: { discount_percentage?: number | string | null }): number {
    const pct = Number(line.discount_percentage ?? 0);
    return Number.isFinite(pct) && pct > 0 ? pct : 0;
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
        iva_percentage: this.saleIvaPercent(),
        ieps_percentage: 0,
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
      iva_percentage: this.saleIvaPercent(),
      ieps_percentage: 0,
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

  private completeCollectedAdvance(): void {
    const quotationId = this.editingQuotationId() || this.editingSaleId();
    if (!quotationId || this.saving() || this.confirming()) return;
    const cart = this.posService.cart();
    if (cart.items.length === 0) {
      this.notifyInfo('Agrega los productos de la venta', 3000);
      return;
    }
    const paid = Number(this.editingAdvanceAmount() ?? 0);
    const sale = Number(cart.grand_total || 0);
    if (sale + 0.009 < paid) {
      this.notifyError(`Sobran ${this.formatCurrency(paid - sale)}. Agrega otro producto.`, 4000);
      return;
    }
    this.saving.set(true);
    this.quotations
      .closeAdvance(quotationId, {
        environment: this.editingAdvanceEnvironment() ?? defaultStampEnvironment(),
        line_items: cart.items.map((item) => mapCartLineToOrderLine(item)),
      })
      .subscribe({
        next: (result) => {
          this.saving.set(false);
          const folio = result.sales_order?.folio || 'OV';
          const difference = Number(result.difference || 0);
          this.notifySuccess(
            difference > 0.009
              ? `Venta ${folio} lista. Caja cobra ${this.formatCurrency(difference)}.`
              : `Venta ${folio} lista. El anticipo la cubre.`,
            7000,
          );
          this.posService.clearCart();
          this.clearEditingTicket();
          this.resetCustomerSelection();
          this.loadSalesInProgress();
        },
        error: (error) => {
          this.saving.set(false);
          this.notifyError(
            resolveHttpErrorMessage(error, 'No se pudo generar la venta'),
            6000,
          );
        },
      });
  }

  saveOrder(): void {
    if (this.editingAdvanceCollected()) {
      this.completeCollectedAdvance();
      return;
    }
    if (this.isEditingReturnedAdvance()) {
      this.resendReturnedQuotation();
      return;
    }
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
    if (cart.items.some((item) => item.without_inventory)) {
      this.notifyError('Hay productos sin inventario. Solo se puede cotizar.', 4000);
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

    if (!this.validateWalkInTicketFields()) {
      return;
    }

    this.confirmCheckout({
      kind: 'sale',
      title: this.isEditingReturnedTicket() ? 'Enviar a caja' : 'Registrar venta',
      subtitle: this.isEditingReturnedTicket()
        ? `Se actualizará el folio ${this.editingFolio()} y volverá a caja.`
        : this.posState.salesQueueMode()
        ? 'Se registrará y quedará en cola hasta que caja cierre el corte anterior y abra el de hoy.'
        : 'Se registrará la venta y el cliente pasará a caja para pagar.',
      totalLabel: this.formatCurrency(cart.grand_total),
      itemSummary: this.cartItemSummary(cart),
      customerLabel: this.ticketCustomerLabel(),
      acceptLabel: this.isEditingReturnedTicket() ? 'Enviar a caja' : 'Registrar venta',
      queued: this.posState.salesQueueMode(),
      initialForShipping: this.editingSaleId() ? this.editingForShipping() : null,
      customerId: this.selectedOrderCustomerId(),
      defaultRouteId: this.selectedCustomerRouteId(),
      initialNotes: this.editingNotes(),
    }).subscribe((confirmed) => {
      if (!confirmed || typeof confirmed !== 'object' || !('forShipping' in confirmed)) {
        return;
      }

      const payload = buildVentasPosOrderPayload(cart, {
        warehouseId: ctx.warehouseId,
        fiscalConfigurationId: ctx.fiscalConfigurationId,
        sellerUserId: seller.id,
        terminalLabel: this.terminalLabel(),
        customerId: this.selectedOrderCustomerId() ?? undefined,
        walkInName: this.walkInName(),
        walkInRfc: normalizeWalkInRfc(this.walkInRfc()),
        forShipping: confirmed.forShipping,
        estimatedDeliveryDate: confirmed.estimatedDeliveryDate,
        routeId: confirmed.routeId,
        notes: confirmed.notes,
      });

      this.saving.set(true);
      const editingId = this.editingSaleId();
      if (editingId) {
        this.posService.replacePosSaleCart(editingId, {
          line_items: payload.line_items,
          customer_id: payload.customer_id,
          global_discount_id: payload.global_discount_id,
          walk_in_name: payload.walk_in_name,
          walk_in_rfc: payload.walk_in_rfc,
          for_shipping: payload.for_shipping,
          requires_shipping: payload.requires_shipping,
          estimated_delivery_date: payload.estimated_delivery_date,
          route_id: payload.route_id,
          notes: payload.notes,
        }).subscribe({
          next: () => {
            this.posService.sendSaleToCaja(editingId).subscribe({
              next: (response) => {
                this.saving.set(false);
                const folioLabel = response.sales_order?.folio || this.editingFolio() || 'sin folio';
                const queued = isPosOrderQueued(response.sales_order) || this.posState.salesQueueMode();
                const customerLabel = this.ticketCustomerLabel();
                const message = queued
                  ? `Venta en cola (${folioLabel}) para ${customerLabel}. El cliente debe pasar a caja cuando abran el corte del día.`
                  : `Venta enviada a caja (${folioLabel}) para ${customerLabel}. El cliente debe pasar a caja para pagar.`;
                this.notifySuccess(message, 6000);
                this.restoreParkedSlot();
                this.loadProducts(this.searchTerm());
                this.loadSalesInProgress();
              },
              error: (error) => {
                this.saving.set(false);
                const backendMessage = error?.error?.message;
                const msg =
                  this.mapPosError(backendMessage, cart.items) || 'Error al enviar a caja';
                this.notifyError(msg, 6000);
              },
            });
          },
          error: (error) => {
            this.saving.set(false);
            const backendMessage = error?.error?.message;
            const msg =
              this.mapPosError(backendMessage, cart.items) || 'Error al actualizar el ticket';
            this.notifyError(msg, 6000);
          },
        });
        return;
      }

      this.posService.createPosSalesOrder(payload).subscribe({
        next: (order) => {
          this.saving.set(false);
          const folioLabel = order.folio ? order.folio : 'sin folio';
          const queued = isPosOrderQueued(order) || this.posState.salesQueueMode();
          const customerLabel = this.ticketCustomerLabel();
          const message = queued
            ? `Venta en cola (${folioLabel}) para ${customerLabel}. El cliente debe pasar a caja cuando abran el corte del día.`
            : `Venta registrada (${folioLabel}) para ${customerLabel}. El cliente debe pasar a caja para pagar.`;
          this.notifySuccess(message, 6000);
          this.posService.clearCart();
          this.resetCustomerSelection();
          this.loadProducts(this.searchTerm());
        },
        error: (error) => {
          this.saving.set(false);
          const backendMessage = error?.error?.message;
          const msg =
            this.mapPosError(backendMessage, cart.items) || 'Error al crear la orden de venta';
          this.notifyError(msg, 6000);
          if (error?.status === 400 && isDiscountApiError(backendMessage)) {
            this.loadProducts(this.searchTerm());
          }
        },
      });
    });
  }

  private resendReturnedQuotation(): void {
    if (this.saving() || this.confirming()) {
      return;
    }
    if (!this.canSell()) {
      this.notifyError('Identifica al vendedor con su código para enviar a caja', 4000);
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

    const editingId = this.editingSaleId();
    if (!editingId) {
      return;
    }

    const customerId = this.selectedCustomerId();
    this.resolveCustomerFiscal(customerId, true).subscribe((customerFiscal) => {
      if (this.selectedCustomerId() !== customerId) {
        return;
      }
      this.confirmCheckout({
        kind: 'quote',
        title: 'Enviar a caja',
        subtitle: `Se actualizará el folio ${this.editingFolio()} y el anticipo volverá a caja.`,
        totalLabel: this.formatCurrency(cart.grand_total),
        cartTotal: Number(cart.grand_total),
        itemSummary: this.cartItemSummary(cart),
        itemLine: this.cartItemLine(cart),
        customerLabel: this.selectedCustomerName(),
        customerFiscal: this.selectedCustomerId() ? customerFiscal : undefined,
        customerActions: {
          edit: () => this.editSelectedCustomerFromDialog(),
          change: () => this.changeCustomerFromDialog(),
        },
        acceptLabel: 'Enviar a caja',
        initialAdvanceAmount: this.editingAdvanceAmount(),
        initialAdvanceUsoCfdi: this.editingAdvanceUsoCfdi(),
        initialAdvanceMetodoPago: this.editingAdvanceMetodoPago(),
      }).subscribe((confirmed) => {
        if (!isPosCheckoutQuoteResult(confirmed)) {
          return;
        }
        if (confirmed.advanceAmount == null) {
          this.notifyError('El anticipo es obligatorio para reenviar a caja', 4000);
          return;
        }

        const payload = buildVentasPosOrderPayload(cart, {
          warehouseId: ctx.warehouseId,
          fiscalConfigurationId: ctx.fiscalConfigurationId,
          sellerUserId: seller.id,
          terminalLabel: this.terminalLabel(),
          customerId: this.selectedOrderCustomerId() ?? undefined,
        });
        const quoteNotes = confirmed.notes.trim();

        this.saving.set(true);
        this.posService.sendQuotationToCaja(editingId, {
          line_items: payload.line_items,
          customer_id: payload.customer_id,
          global_discount_id: payload.global_discount_id,
          ...(quoteNotes ? { notes: quoteNotes } : {}),
          advance_amount: confirmed.advanceAmount,
          ...(confirmed.advanceUsoCfdi ? { advance_uso_cfdi: confirmed.advanceUsoCfdi } : {}),
          ...(confirmed.advanceMetodoPago ? { advance_metodo_pago: confirmed.advanceMetodoPago } : {}),
          ...(confirmed.advanceStampEnvironment
            ? { advance_stamp_environment: confirmed.advanceStampEnvironment }
            : {}),
        }).subscribe({
          next: (response) => {
            this.saving.set(false);
            const folioLabel = response.quotation?.folio || this.editingFolio() || 'sin folio';
            this.notifySuccess(
              `Anticipo ${folioLabel} enviado a caja (${this.formatCurrency(confirmed.advanceAmount ?? 0)}).`,
              7000,
            );
            this.restoreParkedSlot();
            this.loadProducts(this.searchTerm());
            this.loadSalesInProgress();
          },
          error: (error) => {
            this.saving.set(false);
            const backendMessage = error?.error?.message;
            const msg =
              this.mapPosError(backendMessage, cart.items) || 'Error al enviar el anticipo a caja';
            this.notifyError(msg, 6000);
          },
        });
      });
    });
  }

  openAdvanceWizard(): void {
    if (this.saving() || this.confirming()) return;
    if (!this.canQuote()) {
      this.notifyError('No tienes permiso para cotizar', 4000);
      return;
    }
    if (!this.canSell()) {
      this.notifyError('Identifica al vendedor con su código para el anticipo', 4000);
      this.openSellerCodeDialog();
      return;
    }
    const seller = this.posState.seller();
    const ctx = this.resolvePosSaleContext();
    if (!seller?.id || !ctx) return;
    const customerId = this.selectedCustomerId();
    this.resolveCustomerFiscal(customerId, true).subscribe((customerFiscal) => {
      const cart = this.posService.cart();
      this.dialog
        .open(AdvanceWizardDialogComponent, {
          width: '440px',
          maxWidth: '95vw',
          autoFocus: false,
          panelClass: 'advance-wizard-dialog',
          data: {
            mode: 'open',
            cartTotal: Number(cart.grand_total || 0),
            cartCount: cart.items.length,
            customerLabel: this.selectedCustomerName(),
            customerReady: !!customerId && customerFiscal.ready,
            missingFiscal: customerFiscal.missing,
            ivaPercent: this.saleIvaPercent(),
          },
        })
        .afterClosed()
        .subscribe((result: AdvanceWizardOpenResult | undefined) => {
          if (!result || result.mode !== 'open') return;
          const orderCustomerId = this.selectedOrderCustomerId();
          if (orderCustomerId == null || orderCustomerId === '') {
            this.notifyError('Elige un cliente del catálogo para el anticipo', 4000);
            return;
          }
          const payload = result.advanceCase === 'products'
            ? buildVentasPosOrderPayload(cart, {
                warehouseId: ctx.warehouseId,
                fiscalConfigurationId: ctx.fiscalConfigurationId,
                sellerUserId: seller.id,
                terminalLabel: this.terminalLabel(),
                customerId: orderCustomerId ?? undefined,
              })
            : {
                fiscal_configuration_id: ctx.fiscalConfigurationId,
                warehouse_id: ctx.warehouseId,
                customer_id: orderCustomerId,
                expected_delivery_date: todayIsoDate(),
                seller_user_id: seller.id,
                notes: `Anticipo - ${this.terminalLabel()}`,
                line_items: [],
              };
          this.saving.set(true);
          this.posService
            .createPosQuotation({
              ...payload,
              advance_amount: result.amount,
              advance_case: result.advanceCase,
              advance_iva_percentage: result.ivaPercent,
              advance_uso_cfdi: 'G01',
              advance_metodo_pago: 'PUE',
              advance_stamp_environment: result.stampEnvironment,
            })
            .subscribe({
              next: (quotation) => {
                this.saving.set(false);
                const folioLabel = quotation.folio || 'sin folio';
                this.notifySuccess(
                  `Anticipo ${folioLabel} en caja por ${this.formatCurrency(result.amount)}.`,
                  7000,
                );
                if (result.advanceCase === 'products') {
                  this.posService.clearCart();
                }
                this.resetCustomerSelection();
              },
              error: (error) => {
                this.saving.set(false);
                this.notifyError(
                  this.mapPosError(error?.error?.message, cart.items) || 'No se pudo crear el anticipo',
                  6000,
                );
              },
            });
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

    const seller = this.posState.seller();
    if (!seller?.id) {
      this.openSellerCodeDialog();
      return;
    }

    const ctx = this.resolvePosSaleContext();
    if (!ctx) {
      return;
    }

    const customerId = this.selectedCustomerId();
    this.resolveCustomerFiscal(customerId, true).subscribe((customerFiscal) => {
      if (this.selectedCustomerId() !== customerId) {
        return;
      }
      this.openQuotationConfirm(cart, ctx, seller.id, customerFiscal);
    });
  }

  private openQuotationConfirm(
    cart: POSCart,
    ctx: { warehouseId: string; fiscalConfigurationId: string },
    sellerUserId: string,
    customerFiscal: PosCheckoutCustomerFiscal,
  ): void {
    this.confirmCheckout({
      kind: 'quote',
      title: 'Guardar cotización',
      subtitle: 'Activa la factura de anticipo si el cliente deja dinero. Con productos se abre la venta. Sin productos queda la cotización.',
      totalLabel: this.formatCurrency(cart.grand_total),
      cartTotal: Number(cart.grand_total),
      itemCount: cart.items.length,
      itemSummary: this.cartItemSummary(cart),
      itemLine: this.cartItemLine(cart),
      customerLabel: this.selectedCustomerName(),
      customerFiscal: this.selectedCustomerId() ? customerFiscal : undefined,
      customerActions: {
        edit: () => this.editSelectedCustomerFromDialog(),
        change: () => this.changeCustomerFromDialog(),
      },
      acceptLabel: 'Guardar cotización',
    }).subscribe((confirmed) => {
      if (!isPosCheckoutQuoteResult(confirmed)) {
        return;
      }

      const payload = buildVentasPosOrderPayload(cart, {
        warehouseId: ctx.warehouseId,
        fiscalConfigurationId: ctx.fiscalConfigurationId,
        sellerUserId,
        terminalLabel: this.terminalLabel(),
        customerId: this.selectedOrderCustomerId() ?? undefined,
      });
      const quoteNotes = confirmed.notes.trim();
      if (quoteNotes) {
        payload.notes = quoteNotes;
      }
      const advanceAmount = confirmed.advanceAmount;
      const advanceUsoCfdi = confirmed.advanceUsoCfdi;
      const advanceMetodoPago = confirmed.advanceMetodoPago;

      this.saving.set(true);
      this.posService.createPosQuotation(
        advanceAmount != null
          ? {
              ...payload,
              advance_amount: advanceAmount,
              ...(advanceUsoCfdi ? { advance_uso_cfdi: advanceUsoCfdi } : {}),
              ...(advanceMetodoPago ? { advance_metodo_pago: advanceMetodoPago } : {}),
              ...(confirmed.advanceStampEnvironment
                ? { advance_stamp_environment: confirmed.advanceStampEnvironment }
                : {}),
              ...(confirmed.advanceFormaPago
                ? { advance_forma_pago: confirmed.advanceFormaPago }
                : {}),
              advance_case: cart.items.length ? 'products' : 'unknown',
              advance_iva_percentage: this.saleIvaPercent() === 16 ? 16 : 8,
            }
          : payload,
      ).subscribe({
        next: (quotation) => {
          this.saving.set(false);
          const folioLabel = quotation.folio ? quotation.folio : 'sin folio';
          if (advanceAmount != null) {
            this.notifySuccess(
              cart.items.length
                ? `Cotización ${folioLabel} lista. Anticipo timbrado y venta con los productos.`
                : `Cotización ${folioLabel} lista. Anticipo timbrado. Cuando regrese, ábrela en Folios.`,
              7000,
            );
          } else {
            this.notifySuccess(`Cotización guardada (${folioLabel}). No se retuvo inventario.`, 6000);
          }
          this.posService.clearCart();
          this.resetCustomerSelection();
          this.loadProducts(this.searchTerm());
        },
        error: (error) => {
          this.saving.set(false);
          const backendMessage = error?.error?.message;
          const msg =
            this.mapPosError(backendMessage, cart.items) || 'Error al crear la cotización';
          this.notifyError(msg, 6000);
        },
      });
    });
  }

  private emptyCustomerFiscal(): PosCheckoutCustomerFiscal {
    return {
      ready: false,
      missing: ['RFC', 'Razón social', 'Código postal fiscal'],
    };
  }

  private fiscalSnapshot(customer: any): PosCheckoutCustomerFiscal {
    return buildCustomerFiscalSnapshot(customer);
  }

  private rememberCustomerFiscal(customerId: string, customer: any): void {
    this.customerFiscalCache = { id: customerId, fiscal: this.fiscalSnapshot(customer) };
  }

  private resolveCustomerFiscal(customerId: string, force = false): Observable<PosCheckoutCustomerFiscal> {
    if (!customerId) {
      return of(this.emptyCustomerFiscal());
    }
    if (!force && this.customerFiscalCache?.id === customerId) {
      return of(this.customerFiscalCache.fiscal);
    }
    return this.customerService.getCustomer(customerId).pipe(
      map((response) => {
        const customer = unwrapCustomerPayload(response) ?? response;
        const fiscal = this.fiscalSnapshot(customer);
        if (this.selectedCustomerId() === customerId) {
          this.customerFiscalCache = { id: customerId, fiscal };
        }
        return fiscal;
      }),
      catchError(() => of(this.emptyCustomerFiscal())),
    );
  }

  private confirmCheckout(data: PosCheckoutConfirmDialogData) {
    this.confirming.set(true);
    return this.dialog
      .open<PosCheckoutConfirmDialogComponent, PosCheckoutConfirmDialogData, PosCheckoutConfirmResult>(
        PosCheckoutConfirmDialogComponent,
        {
          width: data.kind === 'quote' ? '1280px' : '420px',
          maxWidth: '95vw',
          maxHeight: '95vh',
          disableClose: true,
          panelClass: 'pos-dialog-panel',
          autoFocus: 'first-tabbable',
          data,
        },
      )
      .afterClosed()
      .pipe(
        tap(() => this.confirming.set(false)),
      );
  }

  private cartItemLine(cart: POSCart): string {
    const parts = cart.items
      .map((item) => {
        const name = item.product_name?.trim();
        if (!name) return '';
        const qty = Number(item.quantity || 0);
        return qty > 0 ? `${name} × ${qty}` : name;
      })
      .filter(Boolean);
    return parts.length ? parts.join(' · ') : 'Sin productos';
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

  openCustomerPicker(): void {
    this.pickCustomer().subscribe();
  }

  /** Abre el selector y aplica el cliente elegido. Emite true si hubo cambio. */
  private pickCustomer(): Observable<boolean> {
    return this.dialog
      .open(PosCustomerPickerDialogComponent, {
        width: '520px',
        maxWidth: '95vw',
        panelClass: 'pos-dialog-panel',
        data: { selectedCustomerId: this.selectedCustomerId() },
      })
      .afterClosed()
      .pipe(
        map((result: PosCustomerPickerDialogResult | undefined) => {
          if (!result) {
            return false;
          }
          if (!result.customerId) {
            this.clearSelectedCustomer();
            return true;
          }
          this.selectedCustomerId.set(result.customerId);
          const collectId = result.customer
            ? resolvePosCollectCustomerId(result.customer)
            : resolvePosCollectCustomerId({ id: result.customerId });
          this.selectedOrderCustomerId.set(collectId ?? result.customerId);
          this.selectedCustomerName.set(this.customerDisplayName(result.customer));
          this.selectedCustomerRouteId.set(result.customer?.default_route_id || null);
          this.rememberCustomerFiscal(result.customerId, result.customer);
          return true;
        }),
        tap((changed) => {
          const id = this.selectedCustomerId();
          if (changed && id) {
            this.resolveCustomerFiscal(id, true).subscribe();
          }
          if (changed) {
            this.persistEditingCustomer();
          }
        }),
      );
  }

  private currentCustomerSnapshot(force = false): Observable<PosCheckoutCustomerSnapshot> {
    const id = this.selectedCustomerId();
    return this.resolveCustomerFiscal(id, force).pipe(
      map((fiscal) => ({ label: this.selectedCustomerName(), fiscal })),
    );
  }

  /** Desde Guardar cotización: cambia de cliente y devuelve sus datos fiscales. */
  private changeCustomerFromDialog(): Observable<PosCheckoutCustomerSnapshot | null> {
    return this.pickCustomer().pipe(
      switchMap((changed) => {
        if (!changed) {
          return of(null);
        }
        if (!this.selectedCustomerId()) {
          return of({ label: this.selectedCustomerName(), fiscal: null });
        }
        return this.currentCustomerSnapshot(true);
      }),
    );
  }

  /** Desde Guardar cotización: edita los datos fiscales del cliente y los vuelve a leer. */
  private editSelectedCustomerFromDialog(): Observable<PosCheckoutCustomerSnapshot | null> {
    const customerId = this.selectedCustomerId();
    if (!customerId) {
      return of(null);
    }
    return this.customerService.getCustomer(customerId).pipe(
      switchMap((response) => {
        const customer = unwrapCustomerPayload(response) ?? response;
        return this.dialog
          .open(CustomerEditModalComponent, {
            ...CUSTOMER_FORM_DIALOG_CONFIG,
            data: { customer, initialTab: 'fiscal' },
          })
          .afterClosed();
      }),
      switchMap(() => this.currentCustomerSnapshot(true)),
      catchError(() => of(null)),
    );
  }

  clearCustomerFromCart(): void {
    this.clearSelectedCustomer();
    this.persistEditingCustomer();
  }

  clearSelectedCustomer(): void {
    this.selectedCustomerId.set('');
    this.selectedOrderCustomerId.set(null);
    this.selectedCustomerName.set('Público en General');
    this.selectedCustomerRouteId.set(null);
    this.walkInTicketOpen.set(false);
    this.customerFiscalCache = null;
  }

  onCustomerRowClick(): void {
    if (this.hasSelectedCustomer()) {
      this.openCustomerPicker();
      return;
    }
    this.walkInTicketOpen.update((open) => !open);
  }

  private resetCustomerSelection(): void {
    this.clearSelectedCustomer();
    this.walkInName.set('');
    this.walkInRfc.set('');
  }

  onWalkInRfcChange(value: string): void {
    this.walkInRfc.set((value ?? '').toUpperCase().replace(/[\s-]/g, ''));
  }

  walkInCustomerHint(): string {
    const label = this.ticketCustomerLabel();
    return label === 'Público en General' ? 'Público en General · toca para el ticket' : label;
  }

  ticketCustomerName(ticket: PosSaleInProgress): string {
    return posRegisteredCustomerLabel(ticket.customer, ticket.walk_in_name);
  }

  ticketCustomerLabel(): string {
    if (this.hasSelectedCustomer()) {
      return this.selectedCustomerName();
    }
    const name = this.walkInName().trim();
    const rfc = this.walkInRfc().trim();
    if (name && rfc) {
      return `${name} · ${rfc}`;
    }
    if (name) {
      return name;
    }
    if (rfc) {
      return `Público en General · ${rfc}`;
    }
    return 'Público en General';
  }

  private validateWalkInTicketFields(): boolean {
    if (this.hasSelectedCustomer()) {
      return true;
    }
    if (!isValidWalkInRfc(this.walkInRfc())) {
      this.walkInTicketOpen.set(true);
      this.notifyError('El RFC debe tener 12 o 13 caracteres', 4000);
      return false;
    }
    return true;
  }

  customerInitials(): string {
    const name = this.selectedCustomerName();
    const words = name.split(/\s+/).filter(Boolean);
    if (words.length >= 2) {
      return (words[0][0] + words[1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
  }

  private customerDisplayName(customer: any): string {
    if (!customer) {
      return 'Cliente';
    }
    const parts = [customer.name, customer.lastname].filter(Boolean).join(' ').trim();
    const company = String(customer.company_name ?? '').trim();
    if (company) {
      if (!parts || parts.toLowerCase() === company.toLowerCase()) {
        return company;
      }
      return `${parts} · ${company}`;
    }
    return parts || customer.email || 'Cliente';
  }

  cancel(): void {
    const editing = this.isEditingReturnedTicket();
    this.askPosConfirm({
      title: editing ? 'Descartar cambios' : 'Descartar orden',
      message: editing
        ? `¿Descartar cambios de ${this.editingFolio()}? El ticket sigue en ventas.`
        : '¿Descartar orden actual?',
      cancelLabel: 'Seguir',
      acceptLabel: 'Descartar',
    }).subscribe((confirmed) => {
      if (!confirmed) {
        return;
      }
      if (editing) {
        this.restoreParkedSlot();
        return;
      }
      this.posService.clearCart();
      this.resetCustomerSelection();
    });
  }

  /** Diálogo de la app. `confirm()` del navegador saca el POS de pantalla completa. */
  private askPosConfirm(data: PosConfirmDialogData): Observable<boolean> {
    return this.dialog
      .open(PosConfirmDialogComponent, {
        width: '420px',
        maxWidth: '95vw',
        panelClass: 'pos-dialog-panel',
        autoFocus: 'first-tabbable',
        data,
      })
      .afterClosed()
      .pipe(
        map((confirmed) => confirmed === true),
        takeUntil(this.destroy$),
      );
  }

  formatCurrency(amount: number | string | null | undefined): string {
    return formatUnitCurrency(amount);
  }

  formatCatalogPrice(amount: number): string {
    return new Intl.NumberFormat('es-MX', {
      style: 'currency',
      currency: 'MXN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number(amount) || 0);
  }

  hasLineDiscount(item: POSCartItem): boolean {
    return Number(item.line_discount_amount) > 0.009;
  }

  /** Precio unitario neto, después del descuento de línea. */
  discountedUnitPrice(item: POSCartItem): number {
    const qty = Number(item.quantity) || 1;
    const discountUnit = Number(item.line_discount_amount) / qty;
    return Math.max(Number(item.unit_price) - discountUnit, 0);
  }

  /** Importe de la línea con impuestos, antes del descuento. */
  lineTotalBeforeDiscount(item: POSCartItem): number {
    const unitGross = this.unitPriceWithTaxes(item.unit_price, item.iva_percentage, item.ieps_percentage);
    return unitGross * (Number(item.quantity) || 0);
  }

  /** Precio de lista neto más el IVA elegido en el punto de venta. */
  pricingOptionGross(opt: { price?: number | string }): number {
    return this.unitPriceWithTaxes(opt.price, this.saleIvaPercent(), 0);
  }

  suggestedPricingGross(item: POSCartItem): number {
    return this.unitPriceWithTaxes(
      item.suggested_unit_price ?? item.unit_price,
      this.saleIvaPercent(),
      0,
    );
  }

  catalogPriceGross(product: {
    cost?: number | string;
    suggested_unit_price?: number | string;
  }): number {
    return this.unitPriceWithTaxes(
      product.suggested_unit_price ?? product.cost,
      this.saleIvaPercent(),
      0,
    );
  }

  canChangeSaleIva(): boolean {
    return this.authService.user_info?.is_manager === true;
  }

  setSaleIva(percent: 8 | 16): void {
    this.saleIvaPercent.set(percent);
    const items = this.posService.cart().items.map((item) => ({
      ...item,
      iva_percentage: percent,
      ieps_percentage: 0,
    }));
    this.posService.replaceCart(items);
  }

  stockWarehouseLabel(product: {
    warehouse_names?: string[] | string | null;
    warehouse_name?: string | null;
    batches?: Array<{ warehouse_name?: string | null }> | null;
  }): string {
    const fromList = Array.isArray(product?.warehouse_names)
      ? product.warehouse_names
      : typeof product?.warehouse_names === 'string'
        ? product.warehouse_names.split(',')
        : [];
    const fromBatches = (product?.batches ?? []).map((batch) => batch?.warehouse_name);
    const names = [...fromList, product?.warehouse_name, ...fromBatches]
      .map((name) => String(name ?? '').trim())
      .filter(Boolean);
    return [...new Set(names)].join(', ');
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

  toggleAllowWithoutInventory(): void {
    this.allowWithoutInventory.update((on) => !on);
  }

  canAddToCart(product: any): boolean {
    if (this.catalogIsReadOnly() || !this.canSell()) {
      return false;
    }
    if (this.priceListError()) {
      return false;
    }
    const hasPrice = product.suggested_unit_price != null || product.cost != null;
    if (!hasPrice) {
      return false;
    }
    const stock = Number(product.total_available_quantity ?? 0);
    return stock > 0 || this.allowWithoutInventory();
  }

  getDisabledTooltip(product: any): string {
    if (this.catalogIsReadOnly()) {
      return 'Solo consulta. No se vende mercancía de otra sucursal';
    }
    if (!this.posState.seller()) {
      return 'Identifica al vendedor con su código';
    }
    if (product.suggested_unit_price == null && product.cost == null) {
      return 'Producto sin precio configurado';
    }
    if (Number(product.total_available_quantity ?? 0) <= 0 && !this.allowWithoutInventory()) {
      return 'Sin inventario. Activa el botón para cotizarlo';
    }
    return '';
  }

  async toggleFullscreen(): Promise<void> {
    const root = this.posRootRef?.nativeElement;
    if (!root) return;
    try {
      if (document.fullscreenElement) {
        this.escExitArmed = false;
        this.restoreFullscreenAfterEsc = false;
        this.escapeLocked = false;
        await document.exitFullscreen();
      } else {
        await root.requestFullscreen();
        await this.holdEscapeInFullscreen();
      }
    } catch {
      this.notifyError('No se pudo cambiar a pantalla completa', 2500);
    }
  }

  private armFullscreenRestore(): void {
    if (this.escapeLocked) {
      return;
    }
    if (document.fullscreenElement || this.isFullscreen()) {
      this.restoreFullscreenAfterEsc = true;
    }
  }

  /** Chrome suelta pantalla completa con Esc. Retener la tecla deja el primer Esc para la búsqueda. */
  private async holdEscapeInFullscreen(): Promise<void> {
    const keyboard = (navigator as Navigator & {
      keyboard?: { lock?: (keyCodes?: string[]) => Promise<void> };
    }).keyboard;
    if (!keyboard?.lock || !document.fullscreenElement) {
      this.escapeLocked = false;
      return;
    }
    try {
      await keyboard.lock(['Escape']);
      this.escapeLocked = true;
    } catch {
      this.escapeLocked = false;
    }
  }

  private onFullscreenChange = (): void => {
    const active = !!document.fullscreenElement;
    this.isFullscreen.set(active);
    if (active) {
      void this.holdEscapeInFullscreen();
      return;
    }
    this.escapeLocked = false;
    if (!this.restoreFullscreenAfterEsc) {
      return;
    }
    this.restoreFullscreenAfterEsc = false;
    const root = this.posRootRef?.nativeElement;
    if (!root) {
      return;
    }
    void root.requestFullscreen().then(() => this.holdEscapeInFullscreen()).catch(() => undefined);
  };

  catalogEmptyMessage(): string {
    if (this.priceListError()) {
      return 'No se pudo cargar el catálogo. Revisa la sucursal.';
    }
    if (this.searchTerm().trim()) {
      return 'No hay productos que coincidan con tu búsqueda.';
    }
    if (this.catalogWarehouseId()) {
      return 'No hay productos en esta bodega.';
    }
    return 'No hay productos disponibles en esta sucursal.';
  }

  retryCatalogLoad(): void {
    this.loadProducts(this.searchTerm());
    if (this.catalogView() === 'branches') {
      this.loadBranchTable(this.searchTerm());
    }
  }

  retryBranchTable(): void {
    this.loadBranchTable(this.searchTerm());
  }

  private buildBranchRows(): Array<{
    key: string;
    product: string;
    sku: string;
    branch: string;
    city: string | null;
    quantity: number;
    uom: string;
    here: boolean;
  }> {
    const data = this.branchStock();
    if (!data) {
      return [];
    }
    const hereId = this.catalogBranchId();
    const branches = new Map(data.branches.map((branch) => [branch.id, branch]));
    const rows = data.products.flatMap((product) =>
      product.branches.map((cell) => {
        const branch = branches.get(cell.billing_branch_id);
        const quantity = Number(cell.quantity);
        const city = this.branchCityLabel(branch?.city, branch?.name);
        return {
          key: `${product.product_id}:${cell.billing_branch_id}`,
          product: product.name,
          sku: product.sku,
          branch: prettyPosBranchLabel(branch?.name || 'Sucursal'),
          city,
          quantity: Number.isFinite(quantity) ? quantity : 0,
          uom: cell.uom_name || product.uom_name || 'Pieza',
          here: cell.billing_branch_id === hereId,
        };
      }),
    );
    rows.sort(
      (a, b) =>
        b.quantity - a.quantity ||
        a.product.localeCompare(b.product, 'es') ||
        a.branch.localeCompare(b.branch, 'es'),
    );
    return rows;
  }

  private branchCityLabel(city: string | null | undefined, name: string | null | undefined): string | null {
    const prettyCity = city?.trim() ? prettyPosBranchLabel(city) : '';
    const prettyName = name?.trim() ? prettyPosBranchLabel(name) : '';
    if (!prettyCity || prettyCity.toLowerCase() === prettyName.toLowerCase()) {
      return null;
    }
    return prettyCity;
  }

  private loadBranchTable(search: string): void {
    const term = search.trim();
    if (!term) {
      this.branchTableRequest += 1;
      this.branchStock.set(null);
      this.branchTableLoading.set(false);
      this.branchTableError.set('');
      return;
    }
    const requestId = ++this.branchTableRequest;
    this.branchTableLoading.set(true);
    this.branchTableError.set('');
    this.posService.getPosBranchStock(term).subscribe({
      next: (response) => {
        if (requestId !== this.branchTableRequest || term !== this.searchTerm().trim()) {
          return;
        }
        this.branchStock.set(response);
        this.branchTableLoading.set(false);
      },
      error: (error: unknown) => {
        if (requestId !== this.branchTableRequest) {
          return;
        }
        this.branchStock.set(null);
        this.branchTableLoading.set(false);
        this.branchTableError.set(
          resolveHttpErrorMessage(error, 'No se pudieron consultar las sucursales.'),
        );
      },
    });
  }

  private loadProducts(search = ''): void {
    if (!this.posState.seller()) {
      return;
    }

    this.loading.set(true);
    this.posService
      .getPosInventorySummary({
        search: search.trim() || undefined,
        warehouse_id: this.catalogWarehouseId() || undefined,
        billing_branch_id: this.catalogBranchId() || undefined,
        limit: 200,
      })
      .subscribe({
        next: (summary) => {
          if ((search ?? '') !== this.searchTerm()) {
            return;
          }
          this.applyInventorySummaryMeta(summary);
          const rows = summary.data ?? [];
          const normalized = (rows || []).map((row: any) => ({
            ...row,
            id: row.product_id || row.id,
            name: row.product_name || row.name || 'Producto',
            sku: row.product_sku || row.sku || '',
            primary_photo_url: row.product_photo || row.primary_photo_url || null,
            cost: Number(row.suggested_unit_price ?? row.cost ?? 0),
            suggested_iva_percentage: Number(row.suggested_iva_percentage ?? 8),
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
          this.priceListError.set(false);
          this.publishFiltered(normalized, search);
          this.loading.set(false);
        },
        error: (error) => {
          if ((search ?? '') !== this.searchTerm()) {
            return;
          }
          const recovery = normalizePosInventorySummary(error?.error);
          if (error?.status === 400 && recovery.warehouses.length > 0) {
            persistPosWarehouseId('');
            this.applyInventorySummaryMeta(recovery);
            this.loadProducts(search);
            return;
          }

          this.products.set([]);
          this.publishFiltered([], search);
          this.priceListError.set(true);
          this.loading.set(false);
          this.notifyError('No se pudo cargar inventario POS', 4000);
        },
      });
  }
}
