import {
  AfterViewInit,
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
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import {
  LucideAngularModule,
  Wallet,
  Maximize2,
  Minimize2,
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
  Eye,
  Landmark,
  Pencil,
} from 'lucide-angular';
import { ToastService } from '../../../../core/services/toast.service';
import { AuthService } from '../../../../core/services/auth.service';
import { ExchangeRateService } from '../../../../core/services/exchange-rate.service';
import { PosOverlayHostDirective } from '../../directives/pos-overlay-host.directive';
import { POSService } from '../../services/pos.service';
import { PosStateService } from '../../services/pos-state.service';
import { PosBranchSessionService } from '../../services/pos-branch-session.service';
import {
  dailyShiftPartialCount,
  dailyShiftRemovedTotal,
  dailyShiftSalesTotal,
  dailyShiftTerminalLabel,
  expectedCashInDrawer,
  formatPosMoney,
  parsePosMoney,
  partialPerformedByLabel,
  partialShiftSequence,
  partialShiftTotalLabel,
  PosDailyShiftDetail,
  PosDailyShiftPartial,
} from '../../models/pos-daily-shift.model';
import { mapPosApiErrorMessage } from '../../constants/pos-api-errors';
import { resolveHttpErrorMessage } from '../../../../core/utils/http-error-message.util';
import {
  OpenDailyShiftDialogComponent,
  OpenDailyShiftDialogResult,
} from '../../components/open-daily-shift-dialog/open-daily-shift-dialog.component';
import {
  PartialShiftDialogComponent,
  PartialShiftDialogResult,
} from '../../components/partial-shift-dialog/partial-shift-dialog.component';
import { CloseDailyShiftDialogComponent, CloseDailyShiftDialogData, CloseDailyShiftDialogResult } from '../../components/close-daily-shift-dialog/close-daily-shift-dialog.component';
import { UnclosedDailyShiftDialogComponent } from '../../components/unclosed-daily-shift-dialog/unclosed-daily-shift-dialog.component';
import {
  PosCustomerPickerDialogComponent,
  PosCustomerPickerDialogResult,
} from '../../components/pos-customer-picker-dialog/pos-customer-picker-dialog.component';
import {
  buildCollectPayload,
  isValidCollectCustomerId,
  resolvePosCollectCustomerId,
  buildCashBreakdownPayload,
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
  mixedSelectedCount,
  sumCashDenominations,
  syncCashFormFromReceived,
  validateCollectForm,
} from '../../utils/pos-collect.util';
import {
  CollectedSaleItem,
  CollectedSalesSummary,
  collectedByLabel,
  collectedSaleCustomerCompany,
  collectedSaleCustomerLabel,
  collectedSaleFolio,
  collectedSaleSellerLabel,
  collectedSaleTotal,
  paymentMethodLabel,
  posCustomerCompanySubtitle,
} from '../../models/pos-collected-sales.model';
import { PosSaleReceipt } from '../../models/pos-receipt.model';
import { PosReceiptPrintService } from '../../services/pos-receipt-print.service';
import { PosPrinterSettingsDialogComponent } from '../../components/pos-printer-settings-dialog/pos-printer-settings-dialog.component';
import { PosReceiptPreviewDialogComponent } from '../../components/pos-receipt-preview-dialog/pos-receipt-preview-dialog.component';
import { SalesOrderDetailDialogComponent } from '../../../sales-orders/components/sales-order-detail-dialog/sales-order-detail-dialog.component';
import { ORDER_DETAIL_DIALOG_OPTIONS } from '../../../../core/config/order-detail-dialog.config';
import { SalesOrderInvoiceStampDialogComponent } from '../../../sales-orders/components/sales-order-invoice-stamp-dialog/sales-order-invoice-stamp-dialog.component';
import { SalesOrderService } from '../../../sales-orders/services/sales-order.service';
import { FiscalConfigurationService } from '../../../settings/services/fiscal-configuration.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { CustomerService } from '../../../../core/services/customer.service';
import { Customer } from '../../../customers/models/customer-group.model';
import { SlimSwitchComponent } from '../../../../core/components/slim-switch/slim-switch.component';
import { SpinnerComponent } from '../../../../core/components/spinner/spinner.component';
import { CreditUsageBarComponent } from '../../../customers/components/credit-usage-bar/credit-usage-bar.component';
import { isCustomerCreditEnabled, unwrapCustomerPayload } from '../../../customers/utils/customer-credit.util';
import { CustomerEditModalComponent } from '../../../customers/components/customer-edit-modal/customer-edit-modal.component';
import { CUSTOMER_FORM_DIALOG_CONFIG } from '../../../../core/config/form-dialog.config';

interface PendingSaleCustomer {
  id?: number;
  name?: string;
  lastname?: string;
  company_name?: string;
  fiscal_razon_social?: string;
  is_walk_in?: boolean;
  credit_enabled?: boolean;
}

interface PendingSale {
  id: string;
  folio?: string;
  total?: number | string;
  /** Saldo real por cobrar (considera anticipos registrados en detalle OV). */
  amount_pending?: number | string;
  amount_paid?: number | string;
  created_at?: string;
  fiscal_configuration_id?: string;
  fiscal_configuration?: { id?: string; razon_social?: string; rfc?: string };
  customer?: PendingSaleCustomer;
  seller_user?: { first_name?: string; last_name?: string; pos_user_code?: number | null };
  terminal_user?: { first_name?: string; last_name?: string; pos_user_type?: string };
}

type CustomerMode = 'walk_in' | 'registered';
type DashboardTab = 'pending' | 'collected' | 'shifts';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, SlimSwitchComponent, CreditUsageBarComponent, SpinnerComponent, PosOverlayHostDirective],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
})
export class PaymentComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('posRoot') posRootRef?: ElementRef<HTMLElement>;

  readonly Wallet = Wallet;
  readonly Maximize2 = Maximize2;
  readonly Minimize2 = Minimize2;
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
  readonly Eye = Eye;
  readonly Landmark = Landmark;
  readonly Pencil = Pencil;

  pendingSales = signal<PendingSale[]>([]);
  collectedSales = signal<CollectedSaleItem[]>([]);
  collectedSummary = signal<CollectedSalesSummary | null>(null);
  selectedSale = signal<PendingSale | null>(null);
  selectedCollectedSale = signal<CollectedSaleItem | null>(null);
  collectionDetail = signal<Record<string, unknown> | null>(null);
  loading = signal(false);
  loadingCollected = signal(false);
  loadingShiftDetail = signal(false);
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
  /** ID enviado en POST collect (legacy numérico o UUID). */
  selectedCollectCustomerId = signal<number | string | null>(null);
  selectedCustomerName = signal('Público en General');
  selectedCustomerDetail = signal<Customer | null>(null);
  generateInvoice = signal(false);
  collectError = signal<string | null>(null);
  dailyUsdMxnRate = signal<number | null>(null);
  cashBillCounts = signal<CashDenominationCounts>({});
  cashManualMxn = signal(0);
  cashManualUsd = signal(0);

  readonly cashMxnDenominations = CASH_MXN_DENOMINATIONS;
  readonly cashUsdDenominations = CASH_USD_DENOMINATIONS;

  readonly shift = computed(() => this.posState.dailyShift());
  readonly shiftOpen = computed(() => this.posState.shiftOpen());
  readonly hasOpenShiftRecord = computed(() => this.posState.hasOpenShiftRecord());
  readonly requiresPreviousClose = computed(() => this.posState.requiresPreviousClose());
  private unclosedDialogRef: MatDialogRef<UnclosedDailyShiftDialogComponent> | null = null;

  readonly filteredPendingSales = computed(() => {
    const term = this.searchFolio().trim().toLowerCase();
    const list = this.pendingSales();
    if (!term) {
      return list;
    }
    return list.filter((sale) => {
      const folio = (sale.folio || '').toLowerCase();
      const seller = this.sellerLabel(sale).toLowerCase();
      const customer = this.customerLabel(sale).toLowerCase();
      const company = this.customerCompanyLabel(sale).toLowerCase();
      return folio.includes(term) || seller.includes(term) || customer.includes(term) || company.includes(term) || sale.id.toLowerCase().includes(term);
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
      const company = collectedSaleCustomerCompany(item).toLowerCase();
      const method = paymentMethodLabel(item.payment?.payment_method).toLowerCase();
      return folio.includes(term) || customer.includes(term) || company.includes(term) || method.includes(term);
    });
  });

  readonly collectedSummaryLabel = computed(() => {
    const summary = this.collectedSummary();
    const count = summary?.count ?? this.collectedSales().length;
    const total = formatPosMoney(summary?.total_mxn ?? 0);
    const credit = Number(summary?.credit_mxn ?? 0);
    if (credit > 0) {
      return `${count} cobrada${count === 1 ? '' : 's'} · ${total} · Crédito ${formatPosMoney(credit)}`;
    }
    return `${count} cobrada${count === 1 ? '' : 's'} · ${total}`;
  });

  readonly pendingEmptyMessage = computed(() => {
    const collectedCount = this.collectedSummary()?.count ?? this.collectedSales().length;
    if (collectedCount > 0) {
      return `No hay ventas por cobrar. Ya hay ${collectedCount} orden(es) cobrada(s) en este corte — revisa la pestaña Órdenes cobradas.`;
    }

    const shift = this.shift();
    const shiftTotal = shift ? dailyShiftSalesTotal(shift) : 0;
    if (shiftTotal > 0) {
      return 'El corte muestra ventas registradas, pero ninguna aparece por cobrar. Si vienen de Ventas en cola, se asignan al abrir el corte del día.';
    }

    return 'No hay ventas pendientes de cobro.';
  });

  /** Monto a cobrar en POS (saldo pendiente, no necesariamente el total original). */
  readonly orderTotal = computed(() => this.amountPending(this.selectedSale()));

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
    if (form.paymentMethod === 'credit') {
      return this.creditAvailable() + 0.01 >= total && total > 0;
    }
    return validateCollectForm(form, total) === null;
  });

  readonly showCreditTab = computed(() => {
    if (this.customerMode() !== 'registered') {
      return false;
    }
    if (this.selectedSale()?.customer?.credit_enabled === true) {
      return true;
    }
    return isCustomerCreditEnabled(this.selectedCustomerDetail());
  });

  readonly saleCreditRazonSocial = computed(() => {
    const sale = this.selectedSale();
    const fromSale = sale?.fiscal_configuration?.razon_social?.trim();
    if (fromSale) {
      return fromSale;
    }
    const fiscalId = this.saleFiscalConfigurationId();
    const match = this.selectedCustomerDetail()?.credits?.find(
      (item) => String(item.fiscal_configuration_id) === String(fiscalId)
    );
    return match?.razon_social?.trim() || '';
  });

  readonly creditAvailable = computed(() => Number(this.selectedCustomerDetail()?.credit_available ?? 0));

  readonly fiscalReadyForInvoice = computed(() => this.selectedCustomerDetail()?.fiscal_ready_for_invoice === true);

  readonly showInvoiceSwitch = computed(() => this.customerMode() === 'registered');

  readonly invoiceSwitchDisabled = computed(() => !this.fiscalReadyForInvoice());

  constructor(
    private posService: POSService,
    public posState: PosStateService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private toast: ToastService,
    private dialog: MatDialog,
    private exchangeRateService: ExchangeRateService,
    private receiptPrintService: PosReceiptPrintService,
    private customerService: CustomerService,
    private salesOrderService: SalesOrderService,
    private fiscalConfigService: FiscalConfigurationService,
    private posBranchSession: PosBranchSessionService
  ) {}

  private preselectOrderId = signal<string | null>(null);

  ngOnInit(): void {
    document.addEventListener('fullscreenchange', this.onFullscreenChange);
    document.addEventListener('visibilitychange', this.onVisibilityChange);
    this.loadDailyExchangeRate();
    const orderId = this.route.snapshot.queryParamMap.get('orderId');
    if (orderId) {
      this.preselectOrderId.set(orderId);
    }
  }

  ngAfterViewInit(): void {
    this.posBranchSession.ensureSelected().subscribe({
      next: (ok) => {
        if (ok) {
          this.refreshDailyShift();
        }
      },
      error: (error) => this.toast.error(mapPosApiErrorMessage(error.error?.message)),
    });
  }

  ngOnDestroy(): void {
    document.removeEventListener('fullscreenchange', this.onFullscreenChange);
    document.removeEventListener('visibilitychange', this.onVisibilityChange);
  }

  terminalLabel(): string {
    const email = this.authService.user_info?.email ?? '';
    return email.split('@')[0] || 'Cobranza';
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
        const fiscal = this.authService.getFiscalConfigurationId();
        if (fiscal) {
          this.posState.fiscalConfigurationId.set(fiscal);
        }
        this.posState.setDailyShift(null);
        this.refreshDailyShift(true);
      },
      error: (error) =>
        this.toast.error(
          mapPosApiErrorMessage(resolveHttpErrorMessage(error, 'No se pudo cambiar la sucursal'))
        ),
    });
  }

  private notifyBranchSwitchResult(todayShiftOpen: boolean, previousClose: boolean): void {
    const name = this.posBranchSession.label();
    if (previousClose) {
      this.toast.info(`${name}: hay un corte de otro día. Ciérralo antes de abrir el de hoy.`);
      return;
    }
    if (todayShiftOpen) {
      this.toast.success(`${name}: corte abierto.`);
      return;
    }
    this.toast.info(`${name}: sin corte. Ábrelo aquí para cobrar, o las ventas quedan en cola.`);
  }

  refreshDailyShift(afterBranchSwitch = false): void {
    this.posState.checkingShift.set(true);
    this.posService.getCurrentDailyShift().subscribe({
      next: (response) => {
        const openShift = this.posState.applyCurrentDailyShift(
          response,
          this.authService.getBillingBranchId()
        );
        this.posState.checkingShift.set(false);
        if (openShift) {
          this.loadPendingSales();
          this.loadCollectedSales();
          this.loadShiftDetail();
        } else {
          this.pendingSales.set([]);
          this.collectedSales.set([]);
          this.collectedSummary.set(null);
        }
        if (afterBranchSwitch) {
          this.notifyBranchSwitchResult(
            this.posState.shiftOpen(),
            this.posState.requiresPreviousClose()
          );
        }
        this.promptUnclosedShiftIfNeeded();
      },
      error: (error) => {
        this.posState.checkingShift.set(false);
        if (!this.posState.hasOpenShiftRecord()) {
          this.posState.setDailyShift(null);
        }
        if (error?.status !== 404) {
          this.toast.error(mapPosApiErrorMessage(error.error?.message));
        }
      },
    });
  }

  private promptUnclosedShiftIfNeeded(): void {
    const alert = this.posState.unclosedShiftAlert();
    if (!alert) {
      this.unclosedDialogRef?.close();
      this.unclosedDialogRef = null;
      return;
    }

    const openAlertId = this.unclosedDialogRef?.componentInstance?.data?.alert?.daily_shift_id;
    if (this.unclosedDialogRef && openAlertId === alert.daily_shift_id) {
      return;
    }

    this.unclosedDialogRef?.close();
    this.unclosedDialogRef = this.dialog.open(UnclosedDailyShiftDialogComponent, {
      width: '440px',
      maxWidth: '95vw',
      disableClose: true,
      panelClass: 'pos-dialog-panel',
      autoFocus: false,
      data: {
        mode: 'cobranza',
        alert,
        onCloseShift: () => this.closeDailyShift(),
      },
    });
  }

  openDailyShift(): void {
    if (this.posState.requiresPreviousClose()) {
      this.promptUnclosedShiftIfNeeded();
      this.toast.info('Cierra el corte de ayer antes de abrir el de hoy.');
      return;
    }
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
    if (tab === 'collected') {
      this.selectedSale.set(null);
      this.collectError.set(null);
      this.loadCollectedSales();
      return;
    }
    this.selectedSale.set(null);
    this.selectedCollectedSale.set(null);
    this.collectionDetail.set(null);
    this.collectError.set(null);
    this.loadShiftDetail();
  }

  loadShiftDetail(): void {
    const shiftId = this.shift()?.id;
    if (!shiftId || !this.posState.hasOpenShiftRecord()) {
      return;
    }
    this.loadingShiftDetail.set(true);
    this.posService.getDailyShift(shiftId).subscribe({
      next: (detail) => {
        this.posState.setDailyShift(detail);
        this.loadingShiftDetail.set(false);
      },
      error: (error) => {
        this.loadingShiftDetail.set(false);
        this.toast.error(mapPosApiErrorMessage(error.error?.message));
      },
    });
  }

  loadCollectedSales(): void {
    if (!this.posState.hasOpenShiftRecord()) {
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
    if (this.dashboardTab() === 'shifts') {
      this.loadShiftDetail();
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
          this.setDashboardTab('shifts');
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
      width: '520px',
      maxWidth: '95vw',
      maxHeight: '90vh',
      disableClose: true,
      panelClass: 'pos-dialog-panel',
      data: this.buildCloseDailyShiftData(shift),
    });

    dialogRef.afterClosed().subscribe((result: CloseDailyShiftDialogResult | undefined) => {
      if (!result) {
        return;
      }
      this.posService.closeDailyShift(shift.id, result).subscribe({
        next: (closed) => {
          this.posState.setUnclosedShiftAlert(null);
          this.unclosedDialogRef?.close();
          this.unclosedDialogRef = null;
          this.posState.setDailyShift(null);
          this.pendingSales.set([]);
          this.selectedSale.set(null);
          this.toast.success(this.closeShiftResultMessage(closed));
          this.refreshDailyShift();
        },
        error: (error) => this.toast.error(mapPosApiErrorMessage(error.error?.message)),
      });
    });
  }

  private buildCloseDailyShiftData(shift: PosDailyShiftDetail): CloseDailyShiftDialogData {
    const drawer = shift.cash_drawer;
    const summary = this.collectedSummary();
    const openingMxn = parsePosMoney(drawer?.opening_cash_mxn ?? shift.opening_cash_mxn);
    const openingUsd = parsePosMoney(drawer?.opening_cash_usd ?? shift.opening_cash_usd);
    const collectedCashMxn = parsePosMoney(summary?.cash_mxn ?? drawer?.collected_cash_mxn);
    const collectedCashUsd = parsePosMoney(summary?.cash_usd ?? drawer?.collected_cash_usd);
    const removedMxn = parsePosMoney(drawer?.removed_total_mxn ?? dailyShiftRemovedTotal(shift));
    const removedUsd = parsePosMoney(drawer?.removed_total_usd ?? shift.totals?.removed_total_usd);
    return {
      shiftDate: shift.shift_date,
      branchLabel: this.branchLabel(),
      openingCashMxn: openingMxn,
      openingCashUsd: openingUsd,
      collectedCashMxn,
      collectedCashUsd,
      collectedTransferMxn: parsePosMoney(summary?.transfer_mxn ?? drawer?.collected_transfer_mxn),
      collectedCardMxn: parsePosMoney(summary?.card_mxn ?? drawer?.collected_card_mxn),
      collectedCreditMxn: parsePosMoney(summary?.credit_mxn ?? drawer?.collected_credit_mxn),
      removedMxn,
      removedUsd,
      expectedCashMxn: expectedCashInDrawer(openingMxn, collectedCashMxn, removedMxn),
      expectedCashUsd: expectedCashInDrawer(openingUsd, collectedCashUsd, removedUsd),
      partialCount: this.shiftPartialCount(shift),
      pendingCount: this.pendingSales().length,
      isHistorical: this.posState.requiresPreviousClose(),
    };
  }

  private closeShiftResultMessage(shift: PosDailyShiftDetail): string {
    const diff = parsePosMoney(shift.cash_drawer?.cash_difference_mxn);
    if (diff > 0.009) {
      return `Corte cerrado. Sobrante ${formatPosMoney(diff)}.`;
    }
    if (diff < -0.009) {
      return `Corte cerrado. Faltante ${formatPosMoney(Math.abs(diff))}.`;
    }
    return 'Corte cerrado. La caja cuadra.';
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
    const total = this.amountPending(sale);
    this.cashBillCounts.set({});
    this.cashManualMxn.set(0);
    this.cashManualUsd.set(0);
    this.collectForm.set(this.buildCollectFormForTotal(total));
    this.initCustomerFromSale(sale);
  }

  openSaleDetail(event: Event, orderId?: string | null): void {
    event.preventDefault();
    event.stopPropagation();
    if (!orderId) {
      return;
    }
    this.dialog.open(SalesOrderDetailDialogComponent, {
      ...ORDER_DETAIL_DIALOG_OPTIONS,
      data: { orderId },
    });
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
        next.mixedUsesCash = false;
        next.mixedUsesTransfer = false;
        next.mixedUsesCard = false;
        next.mixedCashMxn = 0;
        next.mixedTransferMxn = 0;
        next.mixedReceivedMxn = 0;
        next.mixedCardMxn = 0;
        next.mixedTransferRef = '';
        next.mixedCardRef = '';
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

  hasCashInput(currency: 'MXN' | 'USD'): boolean {
    const denoms = currency === 'MXN' ? CASH_MXN_DENOMINATIONS : CASH_USD_DENOMINATIONS;
    const hasBills = denoms.some((denom) => this.getBillCount(currency, denom) > 0);
    const manual = currency === 'MXN' ? this.cashManualMxn() : this.cashManualUsd();
    return hasBills || manual > 0;
  }

  clearCashCurrency(currency: 'MXN' | 'USD'): void {
    const denoms = currency === 'MXN' ? CASH_MXN_DENOMINATIONS : CASH_USD_DENOMINATIONS;
    this.cashBillCounts.update((counts) => {
      const next = { ...counts };
      for (const denom of denoms) {
        delete next[cashDenomKey(currency, denom)];
      }
      return next;
    });
    if (currency === 'MXN') {
      this.cashManualMxn.set(0);
    } else {
      this.cashManualUsd.set(0);
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

  toggleMixedType(type: 'cash' | 'transfer' | 'card', enabled: boolean): void {
    const total = this.orderTotal();
    this.collectForm.update((form) => {
      const next = { ...form };
      if (type === 'cash') {
        next.mixedUsesCash = enabled;
        next.mixedCashMxn = enabled ? next.mixedCashMxn : 0;
        next.mixedReceivedMxn = enabled ? Math.max(next.mixedReceivedMxn, next.mixedCashMxn) : 0;
      }
      if (type === 'transfer') {
        next.mixedUsesTransfer = enabled;
        next.mixedTransferMxn = enabled ? next.mixedTransferMxn : 0;
        next.mixedTransferRef = enabled ? next.mixedTransferRef : '';
      }
      if (type === 'card') {
        next.mixedUsesCard = enabled;
        next.mixedCardMxn = enabled ? next.mixedCardMxn : 0;
        next.mixedCardRef = enabled ? next.mixedCardRef : '';
      }
      void total;
      return next;
    });
    this.collectError.set(null);
  }

  mixedTypeCount(): number {
    return mixedSelectedCount(this.collectForm());
  }

  creditInsufficient(): boolean {
    return this.collectForm().paymentMethod === 'credit' && this.creditAvailable() + 0.01 < this.orderTotal();
  }

  openCustomerCreditSettings(): void {
    this.openCustomerEditModal('credit');
  }

  openCustomerEditModal(tab: 'customer' | 'credit' | 'fiscal' | 'registration' = 'customer'): void {
    const customer = this.selectedCustomerDetail();
    if (!customer) {
      return;
    }
    this.dialog
      .open(CustomerEditModalComponent, {
        ...CUSTOMER_FORM_DIALOG_CONFIG,
        data: { customer, initialTab: tab },
      })
      .afterClosed()
      .subscribe(() => {
        if (this.selectedCustomerId()) {
          this.loadRegisteredCustomer(this.selectedCustomerId());
        }
      });
  }

  onGenerateInvoiceChange(enabled: boolean): void {
    if (this.invoiceSwitchDisabled()) {
      return;
    }
    this.generateInvoice.set(enabled);
  }

  private loadRegisteredCustomer(customerId: string): void {
    const fiscalId = this.saleFiscalConfigurationId();
    this.customerService
      .getCustomer(customerId, fiscalId ? { fiscal_configuration_id: fiscalId } : undefined)
      .subscribe({
        next: (raw) => {
          const customer = unwrapCustomerPayload(raw);
          this.selectedCustomerDetail.set(customer);
          const ready = customer?.fiscal_ready_for_invoice === true;
          this.generateInvoice.set(ready && customer?.auto_generate_invoice === true);
          if (!isCustomerCreditEnabled(customer) && this.collectForm().paymentMethod === 'credit') {
            this.setPaymentMethod('cash');
          }
        },
        error: () => {
          this.selectedCustomerDetail.set(null);
          this.generateInvoice.set(false);
        },
      });
  }

  saleFiscalConfigurationId(): string | undefined {
    const sale = this.selectedSale();
    return sale?.fiscal_configuration_id || sale?.fiscal_configuration?.id || undefined;
  }

  private onVisibilityChange = (): void => {
    if (document.visibilityState !== 'visible') {
      return;
    }
    const id = this.selectedCustomerId();
    if (this.customerMode() === 'registered' && id) {
      this.loadRegisteredCustomer(id);
    }
  };

  private openStampAfterCollect(orderId: string): void {
    this.salesOrderService.getOrderDetailById(orderId).pipe(
      switchMap((payload) => {
        const order = payload?.header;
        if (!order) {
          return of(null);
        }
        const lineItems = payload.line_items || payload.header.line_items || [];
        const fiscalId = order.fiscal_configuration?.id ?? order.fiscal_configuration_id;
        const hasPrefix = !!String(order.fiscal_configuration?.prefix ?? '').trim();
        if (!fiscalId || hasPrefix) {
          return of({ order, lineItems });
        }
        return this.fiscalConfigService.getFiscalConfiguration(String(fiscalId)).pipe(
          map((fiscal) => ({
            order: {
              ...order,
              fiscal_configuration: { ...order.fiscal_configuration, ...fiscal },
            },
            lineItems,
          })),
          catchError(() => of({ order, lineItems }))
        );
      })
    ).subscribe({
      next: (data) => {
        if (!data) {
          return;
        }
        this.dialog.open(SalesOrderInvoiceStampDialogComponent, {
          width: '860px',
          maxWidth: '95vw',
          panelClass: 'invoice-stamp-dialog-panel',
          data: {
            orderId,
            order: data.order,
            lineItems: data.lineItems,
            finkokConfig: null,
            validationIssues: [],
            canStamp: true,
          },
        });
      },
      error: () => {
        this.toast.info('El cobro pidió factura. Ábrela desde el detalle de la orden.');
      },
    });
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
      this.selectedCollectCustomerId.set(null);
      this.selectedCustomerDetail.set(null);
      this.generateInvoice.set(false);
      if (this.collectForm().paymentMethod === 'credit') {
        this.setPaymentMethod('cash');
      }
      return;
    }
    if (!this.selectedCustomerId()) {
      this.openCustomerPicker();
    }
  }

  openCustomerPicker(): void {
    const dialogRef = this.dialog.open(PosCustomerPickerDialogComponent, {
      width: '520px',
      maxWidth: '95vw',
      panelClass: 'pos-dialog-panel',
      data: { selectedCustomerId: this.selectedCustomerId() },
    });

    dialogRef.afterClosed().subscribe((result: PosCustomerPickerDialogResult | undefined) => {
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
      const collectId = customer
        ? resolvePosCollectCustomerId(customer)
        : resolvePosCollectCustomerId({ id: result.customerId });
      this.selectedCollectCustomerId.set(collectId ?? null);
      const name = customer
        ? [customer.name, customer.lastname].filter(Boolean).join(' ').trim() ||
          customer.company_name ||
          customer.email ||
          'Cliente'
        : 'Cliente';
      this.selectedCustomerName.set(name);
      this.loadRegisteredCustomer(result.customerId);
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

    if (this.customerMode() === 'registered' && !isValidCollectCustomerId(this.selectedCollectCustomerId())) {
      this.collectError.set('Selecciona un cliente registrado');
      return;
    }

    if (form.paymentMethod === 'credit' && this.creditInsufficient()) {
      this.collectError.set(`Crédito insuficiente. Disponible: ${this.formatCurrency(this.creditAvailable())}`);
      return;
    }

    const customerId = this.resolveCollectCustomerId();

    const payload = {
      ...buildCollectPayload(form, total, customerId),
      ...(this.generateInvoice() && this.customerMode() === 'registered' && this.fiscalReadyForInvoice()
        ? { generate_invoice: true }
        : {}),
      ...(form.paymentMethod === 'cash'
        ? buildCashBreakdownPayload(
            this.cashBillCounts(),
            this.cashManualMxn(),
            this.cashManualUsd()
          )
        : {}),
    };

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
        if (form.paymentMethod === 'credit') {
          this.toast.info('Orden a crédito: sigue pendiente de cobro', { duration: 5000 });
        }
        if (response.invoice?.requested) {
          this.openStampAfterCollect(sale.id);
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

  previewTicket(item: CollectedSaleItem): void {
    const saleId = item.sales_order?.id;
    if (!saleId) {
      return;
    }

    this.dialog.open(PosReceiptPreviewDialogComponent, {
      width: '480px',
      maxWidth: '95vw',
      panelClass: 'pos-dialog-panel',
      autoFocus: false,
      data: {
        salesOrderId: saleId,
        title: `Ticket ${collectedSaleFolio(item)}`,
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
      this.selectedCollectCustomerId.set(null);
      this.selectedCustomerName.set(customer?.name || 'Público en General');
      this.selectedCustomerDetail.set(null);
      this.generateInvoice.set(false);
      return;
    }
    this.customerMode.set('registered');
    this.selectedCustomerId.set(String(customer.id));
    this.selectedCollectCustomerId.set(
      resolvePosCollectCustomerId(customer) ?? (customer.id != null ? customer.id : null)
    );
    this.selectedCustomerName.set(customer.name || 'Cliente');
    this.loadRegisteredCustomer(String(customer.id));
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

  shiftRemovedTotal(shift: PosDailyShiftDetail): string {
    return formatPosMoney(dailyShiftRemovedTotal(shift));
  }

  partialShifts(shift: PosDailyShiftDetail): PosDailyShiftPartial[] {
    return shift.partial_shifts ?? [];
  }

  partialShiftLabel(partial: PosDailyShiftPartial): string {
    return partialShiftTotalLabel(partial);
  }

  shiftOpenedBy(shift: PosDailyShiftDetail): string {
    return dailyShiftTerminalLabel(shift);
  }

  partialPerformedBy(partial: PosDailyShiftPartial, shift: PosDailyShiftDetail): string {
    return partialPerformedByLabel(partial, shift.terminal_user);
  }

  readonly resolvePartialShiftSequence = partialShiftSequence;

  saleTotal(sale: PendingSale): string {
    return formatPosMoney(this.amountPending(sale));
  }

  saleOrderTotal(sale: PendingSale): string {
    return formatPosMoney(this.orderGrandTotalAmount(sale));
  }

  saleAmountPaid(sale: PendingSale): string {
    return formatPosMoney(this.amountPaid(sale));
  }

  private orderGrandTotalAmount(sale: PendingSale | null | undefined): number {
    return parseOrderTotal(sale?.total);
  }

  private amountPending(sale: PendingSale | null | undefined): number {
    if (!sale) return 0;
    if (sale.amount_pending != null && sale.amount_pending !== '') {
      return parseOrderTotal(sale.amount_pending);
    }
    return this.orderGrandTotalAmount(sale);
  }

  private amountPaid(sale: PendingSale | null | undefined): number {
    if (!sale) return 0;
    if (sale.amount_paid != null && sale.amount_paid !== '') {
      return parseOrderTotal(sale.amount_paid);
    }
    return Math.max(0, this.roundMoney(this.orderGrandTotalAmount(sale) - this.amountPending(sale)));
  }

  private roundMoney(value: number): number {
    return Math.round(value * 100) / 100;
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

  customerCompanyLabel(sale: PendingSale): string {
    return posCustomerCompanySubtitle(sale.customer);
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
  readonly collectedSaleCustomerCompany = collectedSaleCustomerCompany;
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

  private resolveCollectCustomerId(): number | string | undefined {
    if (this.customerMode() !== 'registered') {
      return undefined;
    }
    const collectId = this.selectedCollectCustomerId();
    if (isValidCollectCustomerId(collectId)) {
      return collectId;
    }
    return resolvePosCollectCustomerId({ id: this.selectedCustomerId() });
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
