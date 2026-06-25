import { Injectable, computed, signal } from '@angular/core';
import { PosDailyShiftDetail, dailyShiftIsOpen, normalizeDailyShiftDetail } from '../models/pos-daily-shift.model';

export interface PosSellerUser {
  id: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  pos_user_code?: number | null;
}

const SELLER_STORAGE_KEY = 'pos_active_seller';

@Injectable({ providedIn: 'root' })
export class PosStateService {
  dailyShift = signal<PosDailyShiftDetail | null>(null);
  seller = signal<PosSellerUser | null>(this.readStoredSeller());
  fiscalConfigurationId = signal<string | null>(null);
  checkingShift = signal(false);

  readonly shiftOpen = computed(() => dailyShiftIsOpen(this.dailyShift()));
  readonly canCaptureSales = computed(() => !!this.seller());
  readonly needsSellerCode = computed(() => !this.seller());
  readonly salesQueueMode = computed(() => !this.shiftOpen());

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

  clearAll(): void {
    this.dailyShift.set(null);
    this.clearSeller();
    this.fiscalConfigurationId.set(null);
  }

  sellerDisplayName(): string {
    const s = this.seller();
    if (!s) {
      return '';
    }
    const name = `${s.first_name ?? ''} ${s.last_name ?? ''}`.trim();
    return name || s.email || (s.pos_user_code ? `Código ${s.pos_user_code}` : '');
  }

  private readStoredSeller(): PosSellerUser | null {
    try {
      const raw = sessionStorage.getItem(SELLER_STORAGE_KEY);
      return raw ? (JSON.parse(raw) as PosSellerUser) : null;
    } catch {
      return null;
    }
  }
}
