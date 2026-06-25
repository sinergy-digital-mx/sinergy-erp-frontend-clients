import {
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
  ElementRef,
  computed,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {
  LucideAngularModule,
  Monitor,
  Wallet,
  Maximize2,
  Minimize2,
  Package,
  Search,
  User,
  Store,
  ChevronRight,
  Banknote,
  CreditCard,
  ArrowRightLeft,
  Layers,
  RefreshCw,
  Receipt,
  ChevronLeft,
  Printer,
} from 'lucide-angular';
import { ToastService } from '../../../../core/services/toast.service';
import { AuthService } from '../../../../core/services/auth.service';
import { ExchangeRateService } from '../../../../core/services/exchange-rate.service';
import { POSService } from '../../services/pos.service';
import { PosStateService } from '../../services/pos-state.service';
import {
  dailyShiftPartialCount,
  dailyShiftSalesTotal,
  formatPosMoney,
  PosDailyShiftDetail,
} from '../../models/pos-daily-shift.model';
import { mapPosApiErrorMessage } from '../../constants/pos-api-errors';
import {
  OpenDailyShiftDialogComponent,
  OpenDailyShiftDialogResult,
} from '../../components/open-daily-shift-dialog/open-daily-shift-dialog.component';
import {
  PartialShiftDialogComponent,
  PartialShiftDialogResult,
} from '../../components/partial-shift-dialog/partial-shift-dialog.component';
import { CloseDailyShiftDialogComponent } from '../../components/close-daily-shift-dialog/close-daily-shift-dialog.component';
import {
  PosCustomerPickerDialogComponent,
  PosCustomerPickerDialogResult,
} from '../../components/pos-customer-picker-dialog/pos-customer-picker-dialog.component';
import {
  buildCollectPayload,
  cashDenomKey,
  CASH_MXN_DENOMINATIONS,
  CASH_USD_DENOMINATIONS,
  CashDenominationCounts,
  collectAppliedDelta,
  collectAppliedTotal,
  collectCashShortfallMxn,
  collectCashShortfallUsd,
  collectChangeMxn,
  collectChangeUsd,
  CollectPaymentMethod,
  defaultCollectForm,
  parseOrderTotal,
  PosCollectForm,
  splitMixedPaymentDefault,
  sumCashDenominations,
  syncCashFormFromReceived,
  validateCollectForm,
} from '../../utils/pos-collect.util';
import {
  CollectedSaleItem,
  CollectedSalesSummary,
  collectedByLabel,
  collectedSaleCustomerLabel,
  collectedSaleFolio,
  collectedSaleSellerLabel,
  collectedSaleTotal,
  paymentMethodLabel,
} from '../../models/pos-collected-sales.model';
import { PosSaleReceipt } from '../../models/pos-receipt.model';
import { PosReceiptPrintService } from '../../services/pos-receipt-print.service';
import { PosPrinterSettingsDialogComponent } from '../../components/pos-printer-settings-dialog/pos-printer-settings-dialog.component';

interface PendingSaleCustomer {
  id?: number;
  name?: string;
  is_walk_in?: boolean;
}

interface PendingSale {
  id: string;
  folio?: string;
  total?: number | string;
  created_at?: string;
  customer?: PendingSaleCustomer;
  seller_user?: { first_name?: string; last_name?: string; pos_user_code?: number | null };
  terminal_user?: { first_name?: string; last_name?: string; pos_user_type?: string };
}

type CustomerMode = 'walk_in' | 'registered';
type DashboardTab = 'pending' | 'collected';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit, OnDestroy {
  @ViewChild('posRoot') posRootRef?: ElementRef<HTMLElement>;

  readonly Monitor = Monitor;
  readonly Wallet = Wallet;
  readonly Maximize2 = Maximize2;
  readonly Minimize2 = Minimize2;
  readonly Package = Package;
  readonly Search = Search;
  readonly User = User;
  readonly Store = Store;
  readonly ChevronRight = ChevronRight;
  readonly Banknote = Banknote;
  readonly CreditCard = CreditCard;
  readonly ArrowRightLeft = ArrowRightLeft;
  readonly Layers = Layers;
  readonly RefreshCw = RefreshCw;
  readonly Receipt = Receipt;
  readonly ChevronLeft = ChevronLeft;
  readonly Printer = Printer;

  pendingSales = signal<PendingSale[]>([]);
  collectedSales = signal<CollectedSaleItem[]>([]);
  collectedSummary = signal<CollectedSalesSummary | null>(null);
  selectedSale = signal<PendingSale | null>(null);
  selectedCollectedSale = signal<CollectedSaleItem | null>(null);
  collectionDetail = signal<Record<string, unknown> | null>(null);
  loading = signal(false);
  loadingCollected = signal(false);
  loadingCollectionDetail = signal(false);
  collecting = signal(false);
  printingReceipt = signal(false);
  isFullscreen = signal(false);
  dashboardTab = signal<DashboardTab>('pending');
  searchFolio = signal('');
  searchCollectedFolio = signal('');
  collectForm = signal<PosCollectForm>(defaultCollectForm(0));
  customerMode = signal<CustomerMode>('walk_in');
  selectedCustomerId = signal('');
  selectedCustomerName = signal('Público en General');
  collectError = signal<string | null>(null);
  dailyUsdMxnRate = signal<number | null>(null);
  cashBillCounts = signal<CashDenominationCounts>({});
  cashManualMxn = signal(0);
  cashManualUsd = signal(0);

  readonly cashMxnDenominations = CASH_MXN_DENOMINATIONS;
  readonly cashUsdDenominations = CASH_USD_DENOMINATIONS;

  readonly shift = computed(() => this.posState.dailyShift());
  readonly shiftOpen = computed(() => this.posState.shiftOpen());

  readonly filteredPendingSales = computed(() => {
    const term = this.searchFolio().trim().toLowerCase();
    const list = this.pendingSales();
    if (!term) {
      return list;
    }
    return list.filter((sale) => {
      const folio = (sale.folio || '').toLowerCase();
      const seller = this.sellerLabel(sale).toLowerCase();
      return folio.includes(term) || seller.includes(term) || sale.id.toLowerCase().includes(term);
    });
  });

  readonly filteredCollectedSales = computed(() => {
    const term = this.searchCollectedFolio().trim().toLowerCase();
    const list = this.collectedSales();
    if (!term) {
      return list;
    }
    return list.filter((item) => {
      const folio = collectedSaleFolio(item).toLowerCase();
      const customer = collectedSaleCustomerLabel(item).toLowerCase();
      const method = paymentMethodLabel(item.payment?.payment_method).toLowerCase();
      return folio.includes(term) || customer.includes(term) || method.includes(term);
    });
  });

  readonly collectedSummaryLabel = computed(() => {
    const summary = this.collectedSummary();
    const count = summary?.count ?? this.collectedSales().length;
    const total = formatPosMoney(summary?.total_mxn ?? 0);
    return `${count} cobrada${count === 1 ? '' : 's'} · ${total}`;
  });

  readonly orderTotal = computed(() => parseOrderTotal(this.selectedSale()?.total));

  readonly appliedTotal = computed(() => collectAppliedTotal(this.collectForm()));

  readonly changeMxn = computed(() => collectChangeMxn(this.collectForm(), this.orderTotal()));

  readonly changeUsd = computed(() => collectChangeUsd(this.collectForm(), this.orderTotal()));

  readonly cashShortfallMxn = computed(() => collectCashShortfallMxn(this.collectForm(), this.orderTotal()));

  readonly cashShortfallUsd = computed(() => collectCashShortfallUsd(this.collectForm()));

  readonly appliedDelta = computed(() => collectAppliedDelta(this.collectForm(), this.orderTotal()));

  readonly appliedProgress = computed(() => {
    const total = this.orderTotal();
    if (total <= 0) {
      return 0;
    }
    return Math.min(100, Math.round((this.appliedTotal() / total) * 100));
  });

  readonly amountsOk = computed(() => {
    const form = this.collectForm();
    const total = this.orderTotal();
    return validateCollectForm(form, total) === null;
  });

  constructor(
    private posService: POSService,
    public posState: PosStateService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private toast: ToastService,
    private dialog: MatDialog,
    private exchangeRateService: ExchangeRateService,
    private receiptPrintService: PosReceiptPrintService
  ) {}

  private preselectOrderId = signal<string | null>(null);

  ngOnInit(): void {
    document.addEventListener('fullscreenchange', this.onFullscreenChange);
    this.loadDailyExchangeRate();
    this.refreshDailyShift();
    const orderId = this.route.snapshot.queryParamMap.get('orderId');
    if (orderId) {
      this.preselectOrderId.set(orderId);
    }
  }

  ngOnDestroy(): void {
    document.removeEventListener('fullscreenchange', this.onFullscreenChange);
  }

  terminalLabel(): string {
    const email = this.authService.user_info?.email ?? '';
    return email.split('@')[0] || 'Cobranza';
  }

  branchLabel(): string {
    const branch = this.shift()?.billing_branch;
    return branch?.display_name || branch?.code || 'Sucursal';
  }

  refreshDailyShift(): void {
    this.posState.checkingShift.set(true);
    this.posService.getCurrentDailyShift().subscribe({
      next: ({ daily_shift }) => {
        if (daily_shift) {
          this.posState.setDailyShift(daily_shift);
        }
        this.posState.checkingShift.set(false);
        if (this.posState.shiftOpen()) {
          this.loadPendingSales();
          this.loadCollectedSales();
        } else {
          this.pendingSales.set([]);
          this.collectedSales.set([]);
          this.collectedSummary.set(null);
        }
      },
      error: (error) => {
        this.posState.checkingShift.set(false);
        if (!this.posState.shiftOpen()) {
          this.posState.setDailyShift(null);
        }
        if (error?.status !== 404) {
          this.toast.error(mapPosApiErrorMessage(error.error?.message));
        }
      },
    });
  }

  openDailyShift(): void {
    const dialogRef = this.dialog.open(OpenDailyShiftDialogComponent, {
      width: '420px',
      maxWidth: '95vw',
      disableClose: true,
      panelClass: 'pos-dialog-panel',
    });

    dialogRef.afterClosed().subscribe((result: OpenDailyShiftDialogResult | undefined) => {
      if (!result) {
        return;
      }
      this.posService.openDailyShift(result).subscribe({
        next: (response) => {
          this.posState.setDailyShift(response.daily_shift);
          const assigned = response.queued_sales_assigned ?? 0;
          if (assigned > 0) {
            this.toast.success(`Corte abierto. Se asignaron ${assigned} órdenes de cola.`, {
              duration: 5000,
            });
            this.toast.info(`Tienes ${assigned} órdenes por cobrar`, { duration: 5000 });
          } else {
            this.toast.success(response.message || 'Corte del día abierto');
          }
          this.loadPendingSales();
          this.loadCollectedSales();
        },
        error: (error) => this.toast.error(mapPosApiErrorMessage(error.error?.message)),
      });
    });
  }

  setDashboardTab(tab: DashboardTab): void {
    this.dashboardTab.set(tab);
    if (tab === 'pending') {
      this.selectedCollectedSale.set(null);
      this.collectionDetail.set(null);
      return;
    }
    this.selectedSale.set(null);
    this.collectError.set(null);
    this.loadCollectedSales();
  }

  loadCollectedSales(): void {
    if (!this.posState.shiftOpen()) {
      this.collectedSales.set([]);
      this.collectedSummary.set(null);
      return;
    }
    this.loadingCollected.set(true);
    const shiftId = this.shift()?.id;
    this.posService.getCollectedSales(shiftId ? { daily_shift_id: shiftId } : undefined).subscribe({
      next: (response) => {
        this.collectedSales.set(response.collected_sales ?? []);
        this.collectedSummary.set(response.summary);
        this.loadingCollected.set(false);
      },
      error: (error) => {
        this.loadingCollected.set(false);
        this.toast.error(mapPosApiErrorMessage(error.error?.message));
      },
    });
  }

  selectCollectedSale(item: CollectedSaleItem): void {
    this.selectedCollectedSale.set(item);
    this.collectionDetail.set(null);
    const orderId = item.sales_order?.id;
    if (!orderId) {
      return;
    }
    this.loadingCollectionDetail.set(true);
    this.posService.getSaleCollection(orderId).subscribe({
      next: (detail) => {
        this.collectionDetail.set((detail ?? {}) as Record<string, unknown>);
        this.loadingCollectionDetail.set(false);
      },
      error: (error) => {
        this.loadingCollectionDetail.set(false);
        this.toast.error(mapPosApiErrorMessage(error.error?.message));
      },
    });
  }

  clearSelectedCollected(): void {
    this.selectedCollectedSale.set(null);
    this.collectionDetail.set(null);
  }

  refreshListPanel(): void {
    if (this.dashboardTab() === 'collected') {
      this.loadCollectedSales();
      return;
    }
    this.loadPendingSales();
  }

  openPartialShift(): void {
    const shift = this.shift();
    if (!shift?.id) {
      return;
    }
    const dialogRef = this.dialog.open(PartialShiftDialogComponent, {
      width: '440px',
      maxWidth: '95vw',
      disableClose: true,
      panelClass: 'pos-dialog-panel',
      data: { dailyShiftId: shift.id },
    });

    dialogRef.afterClosed().subscribe((result: PartialShiftDialogResult | undefined) => {
      if (!result) {
        return;
      }
      this.posService.createPartialShift(shift.id, result).subscribe({
        next: () => {
          this.toast.success('Corte parcial registrado');
          this.refreshDailyShift();
        },
        error: (error) => this.toast.error(mapPosApiErrorMessage(error.error?.message)),
      });
    });
  }

  closeDailyShift(): void {
    const shift = this.shift();
    if (!shift?.id) {
      return;
    }
    const dialogRef = this.dialog.open(CloseDailyShiftDialogComponent, {
      width: '420px',
      maxWidth: '95vw',
      disableClose: true,
      panelClass: 'pos-dialog-panel',
    });

    dialogRef.afterClosed().subscribe((result: { notes?: string } | undefined) => {
      if (!result) {
        return;
      }
      this.posService.closeDailyShift(shift.id, result).subscribe({
        next: () => {
          this.posState.clearAll();
          this.pendingSales.set([]);
          this.selectedSale.set(null);
          this.toast.success('Corte cerrado correctamente');
        },
        error: (error) => this.toast.error(mapPosApiErrorMessage(error.error?.message)),
      });
    });
  }

  loadPendingSales(): void {
    this.loading.set(true);
    this.posService.getPendingSales().subscribe({
      next: ({ pending_sales }) => {
        const list = (pending_sales ?? []) as PendingSale[];
        this.pendingSales.set(list);
        const preselect = this.preselectOrderId();
        if (preselect) {
          const match = list.find((s) => s.id === preselect);
          if (match) {
            this.selectSale(match);
          }
          this.preselectOrderId.set(null);
        }
        this.loading.set(false);
      },
      error: (error) => {
        this.loading.set(false);
        this.toast.error(mapPosApiErrorMessage(error.error?.message));
      },
    });
  }

  selectSale(sale: PendingSale): void {
    this.dashboardTab.set('pending');
    this.selectedCollectedSale.set(null);
    this.collectionDetail.set(null);
    this.selectedSale.set(sale);
    this.collectError.set(null);
    const total = parseOrderTotal(sale.total);
    this.cashBillCounts.set({});
    this.cashManualMxn.set(0);
    this.cashManualUsd.set(0);
    this.collectForm.set(this.buildCollectFormForTotal(total));
    this.initCustomerFromSale(sale);
  }

  clearSelectedSale(): void {
    this.selectedSale.set(null);
    this.collectError.set(null);
  }

  setPaymentMethod(method: CollectPaymentMethod): void {
    const total = this.orderTotal();
    this.collectForm.update((form) => {
      const next = { ...form, paymentMethod: method };
      if (method === 'cash') {
        this.cashBillCounts.set({});
        this.cashManualMxn.set(0);
        this.cashManualUsd.set(0);
        next.amountCashMxn = total;
        next.amountCashUsd = 0;
        next.receivedCashMxn = 0;
        next.receivedCashUsd = 0;
      }
      if (method === 'transfer') {
        next.amountTransferMxn = total;
      }
      if (method === 'card') {
        next.amountCardMxn = total;
      }
      if (method === 'mixed') {
        const split = splitMixedPaymentDefault(total);
        next.mixedCashMxn = split.mixedCashMxn;
        next.mixedTransferMxn = split.mixedTransferMxn;
        next.mixedReceivedMxn = split.mixedReceivedMxn;
      }
      return next;
    });
    this.collectError.set(null);
  }

  patchCollectForm(patch: Partial<PosCollectForm>): void {
    this.collectForm.update((form) => {
      const next = { ...form, ...patch };
      if (patch.mixedCashMxn != null && next.mixedReceivedMxn < next.mixedCashMxn) {
        next.mixedReceivedMxn = next.mixedCashMxn;
      }
      return next;
    });
    this.collectError.set(null);
  }

  onUsdExchangeRateChange(value: string | number): void {
    this.patchCollectForm({ usdExchangeRate: this.parseMoneyInput(value) });
    this.syncCashFromBillCounts();
  }

  tapBill(currency: 'MXN' | 'USD', denomination: number): void {
    this.setBillCount(currency, denomination, this.getBillCount(currency, denomination) + 1);
  }

  setManualCashReceived(currency: 'MXN' | 'USD', value: number): void {
    const amount = roundMoney(Math.max(0, value));
    if (currency === 'MXN') {
      this.cashManualMxn.set(amount);
    } else {
      this.cashManualUsd.set(amount);
    }
    this.syncCashFromBillCounts();
  }

  exchangeRateBadgeLabel(): string {
    const rate = this.collectForm().usdExchangeRate;
    if (!rate || rate <= 0) {
      return 'Sin TC';
    }
    return `TC $${rate}`;
  }

  getBillCount(currency: 'MXN' | 'USD', denomination: number): number {
    return this.cashBillCounts()[cashDenomKey(currency, denomination)] ?? 0;
  }

  setBillCount(currency: 'MXN' | 'USD', denomination: number, value: number): void {
    const key = cashDenomKey(currency, denomination);
    this.cashBillCounts.update((counts) => ({
      ...counts,
      [key]: Math.max(0, Math.floor(Number(value) || 0)),
    }));
    this.syncCashFromBillCounts();
  }

  cashReceivedMxnLabel(): string {
    return this.formatCurrency(this.collectForm().receivedCashMxn);
  }

  cashReceivedUsdLabel(): string {
    return this.formatCurrencyUsd(this.collectForm().receivedCashUsd);
  }

  setExactCashReceived(currency: 'MXN' | 'USD' = 'MXN'): void {
    const form = this.collectForm();
    if (form.paymentMethod === 'mixed') {
      this.patchCollectForm({ mixedReceivedMxn: form.mixedCashMxn });
    }
  }

  addReceivedCash(delta: number, currency: 'MXN' | 'USD' = 'MXN'): void {
    const form = this.collectForm();
    if (form.paymentMethod === 'mixed') {
      this.patchCollectForm({ mixedReceivedMxn: roundMoney(form.mixedReceivedMxn + delta) });
    }
  }

  parseMoneyInput(value: string | number): number {
    const n = Number(String(value).replace(',', '.'));
    return Number.isFinite(n) ? n : 0;
  }

  setCustomerMode(mode: CustomerMode): void {
    this.customerMode.set(mode);
    if (mode === 'walk_in') {
      const sale = this.selectedSale();
      const walkInName = sale?.customer?.is_walk_in
        ? sale.customer.name || 'Público en General'
        : 'Público en General';
      this.selectedCustomerName.set(walkInName);
      this.selectedCustomerId.set('');
      return;
    }
    if (!this.selectedCustomerId()) {
      void this.openCustomerPicker();
    }
  }

  async openCustomerPicker(): Promise<void> {
    const wasFullscreen = this.isFullscreen() && !!document.fullscreenElement;
    const root = this.posRootRef?.nativeElement;

    const dialogRef = this.dialog.open(PosCustomerPickerDialogComponent, {
      width: '520px',
      maxWidth: '95vw',
      panelClass: 'pos-dialog-panel',
      data: { selectedCustomerId: this.selectedCustomerId() },
    });

    const restoreFullscreenIfNeeded = async (): Promise<void> => {
      if (!wasFullscreen || !root || document.fullscreenElement) {
        return;
      }
      try {
        await root.requestFullscreen();
        this.isFullscreen.set(true);
      } catch {
        this.isFullscreen.set(false);
      }
    };

    dialogRef.afterOpened().subscribe(() => {
      void restoreFullscreenIfNeeded();
    });

    dialogRef.afterClosed().subscribe(async (result: PosCustomerPickerDialogResult | undefined) => {
      await restoreFullscreenIfNeeded();

      if (!result) {
        return;
      }
      if (!result.customerId) {
        this.setCustomerMode('walk_in');
        return;
      }
      this.customerMode.set('registered');
      this.selectedCustomerId.set(result.customerId);
      const customer = result.customer;
      const name = customer
        ? [customer.name, customer.lastname].filter(Boolean).join(' ').trim() ||
          customer.company_name ||
          customer.email ||
          'Cliente'
        : 'Cliente';
      this.selectedCustomerName.set(name);
    });
  }

  collectSelected(): void {
    const sale = this.selectedSale();
    if (!sale?.id) {
      return;
    }

    const form = this.collectForm();
    const total = this.orderTotal();
    const validationError = validateCollectForm(form, total);
    if (validationError) {
      this.collectError.set(validationError);
      return;
    }

    if (this.customerMode() === 'registered' && !this.selectedCustomerId()) {
      this.collectError.set('Selecciona un cliente registrado');
      return;
    }

    const customerId = this.resolveCollectCustomerId();

    const payload = buildCollectPayload(form, total, customerId);

    this.collecting.set(true);
    this.collectError.set(null);

    this.posService.collectSale(sale.id, payload).subscribe({
      next: (response) => {
        this.collecting.set(false);
        const collection = response.collection;
        const change = collection?.change_cash_mxn;
        const folio = sale.folio || response.sales_order?.folio || sale.id;
        const customerName =
          collection?.customer?.display_name ||
          collection?.customer?.name ||
          response.sales_order?.customer?.display_name ||
          response.sales_order?.customer?.name;
        if (change != null && Number(change) > 0) {
          this.toast.success(
            `Venta ${folio} cobrada. Cambio: ${formatPosMoney(change)}`,
            { duration: 5000 }
          );
        } else if (customerName) {
          this.toast.success(`Venta ${folio} cobrada — ${customerName}`);
        } else {
          this.toast.success(`Venta ${folio} cobrada`);
        }
        void this.handleReceiptAfterCollect(sale.id, folio, response.receipt);
        this.selectedSale.set(null);
        this.loadPendingSales();
        this.loadCollectedSales();
        this.refreshDailyShift();
      },
      error: (error) => {
        this.collecting.set(false);
        const msg = mapPosApiErrorMessage(error.error?.message);
        this.collectError.set(msg);
        this.toast.error(msg);
      },
    });
  }

  openPrinterSettings(): void {
    this.dialog.open(PosPrinterSettingsDialogComponent, {
      width: '440px',
      maxWidth: '95vw',
      panelClass: 'pos-dialog-panel',
      autoFocus: false,
    });
  }

  reprintTicket(item: CollectedSaleItem): void {
    const saleId = item.sales_order?.id;
    if (!saleId || this.printingReceipt()) {
      return;
    }

    this.printingReceipt.set(true);
    this.posService.getSaleReceipt(saleId).subscribe({
      next: (receipt) => {
        void this.printReceiptOrPrompt(receipt, collectedSaleFolio(item)).finally(() => {
          this.printingReceipt.set(false);
        });
      },
      error: () => {
        this.printingReceipt.set(false);
        this.toast.error('No se pudo obtener el ticket para reimpresión');
      },
    });
  }

  private async handleReceiptAfterCollect(
    salesOrderId: string,
    folio: string,
    receipt: PosSaleReceipt | null | undefined
  ): Promise<void> {
    if (!this.receiptPrintService.isAutoPrintEnabled()) {
      return;
    }

    if (!this.receiptPrintService.hasPrintableReceipt(receipt)) {
      this.toast.info(`Venta ${folio} cobrada. No se generó ticket; puedes reimprimir después.`, {
        duration: 5000,
      });
      return;
    }

    await this.printReceiptOrPrompt(receipt, folio, salesOrderId);
  }

  private async printReceiptOrPrompt(
    receipt: PosSaleReceipt | null | undefined,
    folio: string,
    salesOrderId?: string
  ): Promise<void> {
    if (!this.receiptPrintService.hasPrintableReceipt(receipt)) {
      this.toast.warning('No hay ticket ESC/POS disponible para esta venta');
      return;
    }

    if (!this.receiptPrintService.getPrinterName()) {
      this.toast.warning('Configura la impresora térmica antes de imprimir', { duration: 5000 });
      this.openPrinterSettings();
      return;
    }

    this.printingReceipt.set(true);
    try {
      await this.receiptPrintService.printReceipt(receipt!);
      this.toast.success(`Ticket de ${folio} enviado a la impresora`);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'No se pudo imprimir el ticket';
      this.toast.error(`Cobro registrado. ${message}`, { duration: 6000 });
      if (salesOrderId) {
        this.toast.info('Usa "Reimprimir ticket" en Órdenes cobradas', { duration: 5000 });
      }
    } finally {
      this.printingReceipt.set(false);
    }
  }

  async toggleFullscreen(): Promise<void> {
    const root = this.posRootRef?.nativeElement;
    if (!root) {
      return;
    }
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await root.requestFullscreen();
      }
    } catch {
      this.toast.error('No se pudo cambiar a pantalla completa');
    }
  }

  private onFullscreenChange = (): void => {
    this.isFullscreen.set(!!document.fullscreenElement);
  };

  private initCustomerFromSale(sale: PendingSale): void {
    const customer = sale.customer;
    if (customer?.is_walk_in || !customer?.id) {
      this.customerMode.set('walk_in');
      this.selectedCustomerId.set('');
      this.selectedCustomerName.set(customer?.name || 'Público en General');
      return;
    }
    this.customerMode.set('registered');
    this.selectedCustomerId.set(String(customer.id));
    this.selectedCustomerName.set(customer.name || 'Cliente');
  }

  shiftSalesTotal(shift: PosDailyShiftDetail): string {
    return formatPosMoney(dailyShiftSalesTotal(shift));
  }

  shiftOpeningMxn(shift: PosDailyShiftDetail): string {
    return formatPosMoney(shift.opening_cash_mxn);
  }

  shiftPartialCount(shift: PosDailyShiftDetail): number {
    return dailyShiftPartialCount(shift);
  }

  saleTotal(sale: PendingSale): string {
    return formatPosMoney(sale.total);
  }

  sellerLabel(sale: PendingSale): string {
    const s = sale.seller_user;
    if (!s) {
      return '—';
    }
    const name = `${s.first_name ?? ''} ${s.last_name ?? ''}`.trim();
    if (name && s.pos_user_code) {
      return `${name} (${s.pos_user_code})`;
    }
    if (name) {
      return name;
    }
    return s.pos_user_code ? `Código ${s.pos_user_code}` : '—';
  }

  customerLabel(sale: PendingSale): string {
    const c = sale.customer;
    if (!c?.name) {
      return 'Mostrador';
    }
    return c.is_walk_in ? `${c.name} (mostrador)` : c.name;
  }

  formatDate(value?: string): string {
    if (!value) {
      return '—';
    }
    return new Date(value).toLocaleString('es-MX', { dateStyle: 'short', timeStyle: 'short' });
  }

  formatCurrency(amount: number): string {
    return formatPosMoney(amount);
  }

  formatCurrencyUsd(amount: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  }

  readonly paymentMethodLabel = paymentMethodLabel;
  readonly collectedSaleFolio = collectedSaleFolio;
  readonly collectedSaleTotal = collectedSaleTotal;
  readonly collectedSaleCustomerLabel = collectedSaleCustomerLabel;
  readonly collectedSaleSellerLabel = collectedSaleSellerLabel;
  readonly collectedByLabel = collectedByLabel;

  collectionDetailPayment(): Record<string, unknown> | null {
    const detail = this.collectionDetail();
    if (!detail) {
      return null;
    }
    const collection = (detail['collection'] ?? detail) as Record<string, unknown>;
    return collection && typeof collection === 'object' ? collection : null;
  }

  moneyLabel(value: unknown): string {
    return formatPosMoney(value as number | string);
  }

  exchangeRateFromConfig(): boolean {
    return this.dailyUsdMxnRate() != null;
  }

  private loadDailyExchangeRate(): void {
    this.exchangeRateService.getDailyExchangeRate().subscribe({
      next: (rate) => {
        const value = rate?.exchange_rate;
        if (value != null && Number.isFinite(value) && value > 0) {
          this.dailyUsdMxnRate.set(value);
          this.applyDailyExchangeRateToForm();
        }
      },
      error: () => this.dailyUsdMxnRate.set(null),
    });
  }

  private applyDailyExchangeRateToForm(): void {
    const rate = this.dailyUsdMxnRate();
    if (rate == null) {
      return;
    }
    this.collectForm.update((form) => ({ ...form, usdExchangeRate: rate }));
  }

  private buildCollectFormForTotal(total: number): PosCollectForm {
    return defaultCollectForm(total, this.dailyUsdMxnRate() ?? undefined);
  }

  private resolveCollectCustomerId(): number | undefined {
    if (this.customerMode() !== 'registered' || !this.selectedCustomerId()) {
      return undefined;
    }
    const customerId = Number(this.selectedCustomerId());
    if (!Number.isFinite(customerId) || customerId <= 0) {
      return undefined;
    }
    return Math.floor(customerId);
  }

  private syncCashFromBillCounts(): void {
    const counts = this.cashBillCounts();
    const receivedCashMxn = roundMoney(
      sumCashDenominations(counts, 'MXN', CASH_MXN_DENOMINATIONS) + this.cashManualMxn()
    );
    const receivedCashUsd = roundMoney(
      sumCashDenominations(counts, 'USD', CASH_USD_DENOMINATIONS) + this.cashManualUsd()
    );
    this.collectForm.update((form) => ({
      ...form,
      ...syncCashFormFromReceived(
        { ...form, receivedCashMxn, receivedCashUsd },
        this.orderTotal()
      ),
    }));
    this.collectError.set(null);
  }
}

function roundMoney(value: number): number {
  return Math.round(value * 100) / 100;
}
