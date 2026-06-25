import {
  __spreadValues
} from "./chunk-57S27ROJ.js";

// src/app/features/pos/models/pos-daily-shift.model.ts
function parsePosMoney(value) {
  if (value == null || value === "") {
    return 0;
  }
  const n = typeof value === "number" ? value : Number(value);
  return Number.isFinite(n) ? n : 0;
}
function formatPosMoney(value) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2
  }).format(parsePosMoney(value));
}
function dailyShiftTerminalLabel(shift) {
  const user = shift.terminal_user;
  if (!user) {
    return "\u2014";
  }
  const name = `${user.first_name ?? ""} ${user.last_name ?? ""}`.trim();
  return name || user.email || "\u2014";
}
function dailyShiftBranchLabel(shift) {
  const branch = shift.billing_branch;
  if (!branch) {
    return "\u2014";
  }
  return branch.display_name?.trim() || branch.code?.trim() || "\u2014";
}
function normalizeDailyShiftStatus(status) {
  if (status == null) {
    return null;
  }
  if (typeof status === "object") {
    const obj = status;
    return normalizeDailyShiftStatus(obj["code"] ?? obj["name"] ?? obj["value"] ?? obj["status"]);
  }
  const normalized = String(status).trim().toLowerCase();
  if (normalized === "open" || normalized === "abierto" || normalized === "opened" || normalized === "activo") {
    return "open";
  }
  if (normalized === "closed" || normalized === "cerrado" || normalized === "closed_day") {
    return "closed";
  }
  return String(status);
}
function normalizeDailyShiftDetail(raw) {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return null;
  }
  const source = raw;
  if (!source["id"] && !source["status"] && !source["is_open"]) {
    return null;
  }
  const shift = __spreadValues({}, source);
  const normalizedStatus = normalizeDailyShiftStatus(source["is_open"] === true ? "open" : source["is_open"] === false ? "closed" : shift.status);
  if (normalizedStatus) {
    shift.status = normalizedStatus;
  }
  return shift;
}
function dailyShiftStatusLabel(status) {
  const normalized = normalizeDailyShiftStatus(status);
  return normalized === "open" ? "Abierto" : normalized === "closed" ? "Cerrado" : status ?? "\u2014";
}
function dailyShiftIsOpen(shift) {
  if (!shift) {
    return false;
  }
  const record = shift;
  if (typeof record.is_open === "boolean") {
    return record.is_open;
  }
  return normalizeDailyShiftStatus(shift.status) === "open";
}
function dailyShiftSalesTotal(shift) {
  return parsePosMoney(shift.totals?.sales_total_mxn) || parsePosMoney(shift.sales_summary?.total_mxn);
}
function dailyShiftPartialCount(shift) {
  return shift.totals?.partial_shifts_count ?? shift.partial_shifts_count ?? 0;
}

// src/app/features/pos/models/pos-collected-sales.model.ts
var PAYMENT_METHOD_LABELS = {
  cash: "Efectivo",
  transfer: "Transferencia",
  card: "Tarjeta",
  mixed: "Mixto"
};
function paymentMethodLabel(method) {
  if (!method) {
    return "\u2014";
  }
  return PAYMENT_METHOD_LABELS[method] ?? method;
}
function collectedSaleFolio(item) {
  return item.sales_order?.folio || item.sales_order?.id?.substring(0, 8) || "\u2014";
}
function collectedSaleTotal(item) {
  const total = item.payment?.order_total_mxn ?? item.sales_order?.total;
  return formatPosMoney(total);
}
function collectedSaleCustomerLabel(item) {
  const c = item.customer;
  if (!c?.name) {
    return "Mostrador";
  }
  return c.is_walk_in ? `${c.name} (mostrador)` : c.name;
}
function collectedSaleSellerLabel(item) {
  const s = item.seller_user;
  if (!s) {
    return "\u2014";
  }
  const name = `${s.first_name ?? ""} ${s.last_name ?? ""}`.trim();
  if (name && s.pos_user_code) {
    return `${name} (${s.pos_user_code})`;
  }
  return name || (s.pos_user_code ? `C\xF3digo ${s.pos_user_code}` : "\u2014");
}
function collectedByLabel(item) {
  const u = item.collected_by_user;
  if (!u) {
    return "\u2014";
  }
  return `${u.first_name ?? ""} ${u.last_name ?? ""}`.trim() || "\u2014";
}
function normalizeCollectedSalesResponse(payload) {
  const obj = payload ?? {};
  const raw = obj["collected_sales"] ?? obj["data"] ?? (Array.isArray(payload) ? payload : []);
  const collected_sales = Array.isArray(raw) ? raw : [];
  const summary = obj["summary"] ?? null;
  return {
    daily_shift: obj["daily_shift"] ?? null,
    collected_sales,
    summary
  };
}

// src/app/features/pos/models/pos-sale-collection.model.ts
function normalizePosSaleCollection(raw) {
  if (!raw || typeof raw !== "object") {
    return null;
  }
  return raw;
}
function posCollectionMoneyLabel(value) {
  return formatPosMoney(value);
}
function posCollectionUsdLabel(value) {
  const n = Number(value);
  if (!Number.isFinite(n)) {
    return "$0.00";
  }
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}
function posCollectionMethodLabel(method) {
  return paymentMethodLabel(method);
}

export {
  parsePosMoney,
  formatPosMoney,
  dailyShiftTerminalLabel,
  dailyShiftBranchLabel,
  normalizeDailyShiftDetail,
  dailyShiftStatusLabel,
  dailyShiftIsOpen,
  dailyShiftSalesTotal,
  dailyShiftPartialCount,
  paymentMethodLabel,
  collectedSaleFolio,
  collectedSaleTotal,
  collectedSaleCustomerLabel,
  collectedSaleSellerLabel,
  collectedByLabel,
  normalizeCollectedSalesResponse,
  normalizePosSaleCollection,
  posCollectionMoneyLabel,
  posCollectionUsdLabel,
  posCollectionMethodLabel
};
//# sourceMappingURL=chunk-HSRMLKO4.js.map
