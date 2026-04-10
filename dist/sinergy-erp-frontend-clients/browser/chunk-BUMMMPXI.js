import {
  Injectable,
  setClassMetadata,
  ɵɵdefineInjectable
} from "./chunk-7ZU2RCPO.js";

// src/app/features/purchase-orders/services/tax-calculator.service.ts
var TaxCalculatorService = class _TaxCalculatorService {
  /**
   * Calculate line item totals
   * Formula:
   * - subtotal = quantity × unit_price
   * - iva_amount = subtotal × (iva_percentage / 100)
   * - ieps_amount = subtotal × (ieps_percentage / 100)
   * - line_total = subtotal + iva_amount + ieps_amount
   */
  calculateLineItem(quantity, unitPrice, ivaPercentage, iepsPercentage) {
    const subtotal = quantity * unitPrice;
    const iva_amount = subtotal * (ivaPercentage / 100);
    const ieps_amount = subtotal * (iepsPercentage / 100);
    const line_total = subtotal + iva_amount + ieps_amount;
    return {
      subtotal: this.roundToTwoDecimals(subtotal),
      iva_amount: this.roundToTwoDecimals(iva_amount),
      ieps_amount: this.roundToTwoDecimals(ieps_amount),
      line_total: this.roundToTwoDecimals(line_total)
    };
  }
  /**
   * Calculate order totals from line items
   * Formula:
   * - total_subtotal = Σ(line_items.subtotal)
   * - total_iva = Σ(line_items.iva_amount)
   * - total_ieps = Σ(line_items.ieps_amount)
   * - grand_total = Σ(line_items.line_total)
   */
  calculateOrderTotals(lineItems) {
    const total_subtotal = lineItems.reduce((sum, item) => sum + item.subtotal, 0);
    const total_iva = lineItems.reduce((sum, item) => sum + item.iva_amount, 0);
    const total_ieps = lineItems.reduce((sum, item) => sum + item.ieps_amount, 0);
    const grand_total = lineItems.reduce((sum, item) => sum + item.line_total, 0);
    return {
      total_subtotal: this.roundToTwoDecimals(total_subtotal),
      total_iva: this.roundToTwoDecimals(total_iva),
      total_ieps: this.roundToTwoDecimals(total_ieps),
      grand_total: this.roundToTwoDecimals(grand_total)
    };
  }
  /**
   * Calculate remaining amount after payments
   * Formula: remaining_amount = grand_total - Σ(payments.amount)
   */
  calculateRemainingAmount(grandTotal, payments) {
    const paidAmount = payments.reduce((sum, payment) => sum + payment.amount, 0);
    return this.roundToTwoDecimals(grandTotal - paidAmount);
  }
  /**
   * Determine payment status based on amounts
   * Formula:
   * - "Pagada" if Σ(payments.amount) = grand_total
   * - "Parcial" if 0 < Σ(payments.amount) < grand_total
   * - "No pagado" if Σ(payments.amount) = 0
   */
  determinePaymentStatus(grandTotal, paidAmount) {
    const remaining = this.roundToTwoDecimals(grandTotal - paidAmount);
    if (remaining === 0) {
      return "Pagada";
    } else if (paidAmount > 0 && remaining > 0) {
      return "Parcial";
    } else {
      return "No pagado";
    }
  }
  /**
   * Format currency amount
   */
  formatCurrency(amount) {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount);
  }
  /**
   * Round to two decimal places
   */
  roundToTwoDecimals(value) {
    return Math.round(value * 100) / 100;
  }
  static \u0275fac = function TaxCalculatorService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TaxCalculatorService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _TaxCalculatorService, factory: _TaxCalculatorService.\u0275fac, providedIn: "root" });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TaxCalculatorService, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();

export {
  TaxCalculatorService
};
//# sourceMappingURL=chunk-BUMMMPXI.js.map
