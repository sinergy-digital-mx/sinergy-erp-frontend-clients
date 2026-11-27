import { Injectable, computed, signal } from '@angular/core';
import {
  CurrentDailyShiftResponse,
  PosDailyShiftDetail,
  UnclosedShiftAlert,
  dailyShiftIsOpen,
  dailyShiftMatchesBranch,
  normalizeDailyShiftDetail,
  unclosedAlertFromShift,
} from '../models/pos-daily-shift.model';

export interface PosSellerUser {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  pos_user_code?: number | null;
}

const SELLER_STORAGE_KEY = 'pos_active_seller';
const CASHIER_STORAGE_KEY = 'pos_active_cashier';

@Injectable({ providedIn: 'root' })
export class PosStateService {
  dailyShift = signal<PosDailyShiftDetail | null>(null);
  unclosedShiftAlert = signal<UnclosedShiftAlert | null>(null);
  seller = signal<PosSellerUser | null>(this.readStoredSeller());
  cashier = signal<PosSellerUser | null>(this.readStoredCashier());
  fiscalConfigurationId = signal<string | null>(null);
  checkingShift = signal(false);

  readonly hasOpenShiftRecord = computed(() => dailyShiftIsOpen(this.dailyShift()));
  readonly requiresPreviousClose = computed(() => !!this.unclosedShiftAlert());
  readonly shiftOpen = computed(
    () => this.hasOpenShiftRecord() && !this.requiresPreviousClose()
  );
  readonly canCaptureSales = computed(() => !!this.seller());
  readonly needsSellerCode = computed(() => !this.seller());
  readonly salesQueueMode = computed(() => !this.shiftOpen());

  applyCurrentDailyShift(
    response: CurrentDailyShiftResponse,
    _billingBranchId?: string | null
  ): PosDailyShiftDetail | null {
    const openShift =
      response.daily_shift && dailyShiftIsOpen(response.daily_shift)
        ? response.daily_shift
        : null;
    const shift =
      openShift && dailyShiftMatchesBranch(openShift, _billingBranchId) ? openShift : null;

    this.setDailyShift(shift);

    const alert = shift
      ? response.unclosed_shift_alert ??
        (response.requires_previous_close || shift.is_previous_day
          ? unclosedAlertFromShift(shift)
          : null)
      : null;
    this.unclosedShiftAlert.set(alert);
    return shift;
  }

  setDailyShift(shift: PosDailyShiftDetail | null): void {
    const normalized = shift ? normalizeDailyShiftDetail(shift) : null;
    this.dailyShift.set(normalized);
    if (normalized?.billing_branch) {
      const branch = normalized.billing_branch as {
        fiscal_configuration_id?: string;
        fiscal_configuration?: { id?: string };
      };
      const fiscalId =
        branch.fiscal_configuration_id ?? branch.fiscal_configuration?.id ?? null;
      if (fiscalId) {
        this.fiscalConfigurationId.set(String(fiscalId));
      }
    }
    this.syncUnclosedAlert(normalized);
  }

  setUnclosedShiftAlert(alert: UnclosedShiftAlert | null): void {
    this.unclosedShiftAlert.set(alert);
  }

  setSeller(seller: PosSellerUser | null): void {
    this.seller.set(seller);
    if (seller) {
      sessionStorage.setItem(SELLER_STORAGE_KEY, JSON.stringify(seller));
    } else {
      sessionStorage.removeItem(SELLER_STORAGE_KEY);
    }
  }

  clearSeller(): void {
    this.setSeller(null);
  }

  setCashier(cashier: PosSellerUser | null): void {
    this.cashier.set(cashier);
    if (cashier) {
      sessionStorage.setItem(CASHIER_STORAGE_KEY, JSON.stringify(cashier));
    } else {
      sessionStorage.removeItem(CASHIER_STORAGE_KEY);
    }
  }

  clearCashier(): void {
    this.setCashier(null);
  }

  clearAll(): void {
    this.dailyShift.set(null);
    this.unclosedShiftAlert.set(null);
    this.clearSeller();
    this.clearCashier();
    this.fiscalConfigurationId.set(null);
  }

  cashierDisplayName(): string {
    return this.personDisplayName(this.cashier());
  }

  sellerDisplayName(): string {
    return this.personDisplayName(this.seller());
  }

  private personDisplayName(person: PosSellerUser | null): string {
    if (!person) {
      return '';
    }
    const name = `${person.first_name ?? ''} ${person.last_name ?? ''}`.trim();
    return name || person.email || (person.pos_user_code ? `Código ${person.pos_user_code}` : '');
  }

  private syncUnclosedAlert(shift: PosDailyShiftDetail | null): void {
    if (!dailyShiftIsOpen(shift) || !shift) {
      this.unclosedShiftAlert.set(null);
      return;
    }

    const current = this.unclosedShiftAlert();
    if (current?.daily_shift_id === shift.id) {
      return;
    }

    if (shift.is_previous_day) {
      this.unclosedShiftAlert.set(unclosedAlertFromShift(shift));
      return;
    }

    this.unclosedShiftAlert.set(null);
  }

  private readStoredSeller(): PosSellerUser | null {
    return this.readStoredPerson(SELLER_STORAGE_KEY);
  }

  private readStoredCashier(): PosSellerUser | null {
    return this.readStoredPerson(CASHIER_STORAGE_KEY);
  }

  private readStoredPerson(key: string): PosSellerUser | null {
    try {
      const raw = sessionStorage.getItem(key);
      return raw ? (JSON.parse(raw) as PosSellerUser) : null;
    } catch {
      return null;
    }
  }
}
