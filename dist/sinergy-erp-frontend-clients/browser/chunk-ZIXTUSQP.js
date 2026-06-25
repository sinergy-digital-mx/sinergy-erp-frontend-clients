import {
  dailyShiftIsOpen,
  normalizeDailyShiftDetail
} from "./chunk-HSRMLKO4.js";
import {
  Injectable,
  computed,
  setClassMetadata,
  signal,
  ɵɵdefineInjectable
} from "./chunk-57S27ROJ.js";

// src/app/features/pos/services/pos-state.service.ts
var SELLER_STORAGE_KEY = "pos_active_seller";
var PosStateService = class _PosStateService {
  dailyShift = signal(null, ...ngDevMode ? [{ debugName: "dailyShift" }] : []);
  seller = signal(this.readStoredSeller(), ...ngDevMode ? [{ debugName: "seller" }] : []);
  fiscalConfigurationId = signal(null, ...ngDevMode ? [{ debugName: "fiscalConfigurationId" }] : []);
  checkingShift = signal(false, ...ngDevMode ? [{ debugName: "checkingShift" }] : []);
  shiftOpen = computed(() => dailyShiftIsOpen(this.dailyShift()), ...ngDevMode ? [{ debugName: "shiftOpen" }] : []);
  canCaptureSales = computed(() => !!this.seller(), ...ngDevMode ? [{ debugName: "canCaptureSales" }] : []);
  needsSellerCode = computed(() => !this.seller(), ...ngDevMode ? [{ debugName: "needsSellerCode" }] : []);
  salesQueueMode = computed(() => !this.shiftOpen(), ...ngDevMode ? [{ debugName: "salesQueueMode" }] : []);
  setDailyShift(shift) {
    const normalized = shift ? normalizeDailyShiftDetail(shift) : null;
    this.dailyShift.set(normalized);
    if (normalized?.billing_branch) {
      const branch = normalized.billing_branch;
      const fiscalId = branch.fiscal_configuration_id ?? branch.fiscal_configuration?.id ?? null;
      if (fiscalId) {
        this.fiscalConfigurationId.set(String(fiscalId));
      }
    }
  }
  setSeller(seller) {
    this.seller.set(seller);
    if (seller) {
      sessionStorage.setItem(SELLER_STORAGE_KEY, JSON.stringify(seller));
    } else {
      sessionStorage.removeItem(SELLER_STORAGE_KEY);
    }
  }
  clearSeller() {
    this.setSeller(null);
  }
  clearAll() {
    this.dailyShift.set(null);
    this.clearSeller();
    this.fiscalConfigurationId.set(null);
  }
  sellerDisplayName() {
    const s = this.seller();
    if (!s) {
      return "";
    }
    const name = `${s.first_name ?? ""} ${s.last_name ?? ""}`.trim();
    return name || s.email || (s.pos_user_code ? `C\xF3digo ${s.pos_user_code}` : "");
  }
  readStoredSeller() {
    try {
      const raw = sessionStorage.getItem(SELLER_STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }
  static \u0275fac = function PosStateService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PosStateService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PosStateService, factory: _PosStateService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PosStateService, [{
    type: Injectable,
    args: [{ providedIn: "root" }]
  }], null, null);
})();

export {
  PosStateService
};
//# sourceMappingURL=chunk-ZIXTUSQP.js.map
