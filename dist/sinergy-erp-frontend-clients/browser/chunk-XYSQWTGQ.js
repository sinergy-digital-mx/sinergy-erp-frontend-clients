import {
  SALES_ORDER_PERMISSIONS
} from "./chunk-VC2XUF46.js";
import {
  DIVINO_DASHBOARD_PERMISSIONS
} from "./chunk-F65OR5PH.js";
import {
  MARKETING_PERMISSIONS
} from "./chunk-3YDE66GB.js";
import {
  PURCHASE_ORDER_PERMISSIONS
} from "./chunk-O7LFISSX.js";
import {
  INVENTORY_PERMISSIONS
} from "./chunk-XPSKNRZU.js";
import {
  CUSTOMER_PERMISSIONS
} from "./chunk-4VG5IEU6.js";
import {
  PROPERTY_PERMISSIONS
} from "./chunk-3BJZNAHA.js";
import {
  CONTRACT_PERMISSIONS
} from "./chunk-EUPOEI4B.js";
import {
  SETTINGS_PERMISSIONS
} from "./chunk-K6DFM2KE.js";
import {
  LEAD_PERMISSIONS
} from "./chunk-EQHNMCLE.js";

// src/app/features/pos/config/permissions.config.ts
var POS_PERMISSIONS = {
  // Module access
  viewMenu: "pos:ViewMenu",
  // Views
  viewDashboard: "pos:Read",
  viewSales: "pos:Read",
  viewReports: "pos:Read",
  // Operations
  createSale: "pos:CreateSale",
  voidSale: "pos:VoidSale",
  refund: "pos:Refund",
  // Cash management
  openCashDrawer: "pos:OpenCashDrawer",
  closeCashDrawer: "pos:CloseCashDrawer",
  manageCash: "pos:ManageCash",
  // Special actions
  applyDiscount: "pos:ApplyDiscount",
  viewCost: "pos:ViewCost",
  overridePrice: "pos:OverridePrice",
  // Reports
  viewDailyReport: "pos:ViewDailyReport",
  viewCashierReport: "pos:ViewCashierReport",
  exportReport: "pos:ExportReport"
};

// src/app/core/config/permissions.config.ts
var PERMISSIONS = {
  contracts: CONTRACT_PERMISSIONS,
  customers: CUSTOMER_PERMISSIONS,
  leads: LEAD_PERMISSIONS,
  properties: PROPERTY_PERMISSIONS,
  settings: SETTINGS_PERMISSIONS,
  inventory: INVENTORY_PERMISSIONS,
  marketing: MARKETING_PERMISSIONS,
  pos: POS_PERMISSIONS,
  purchaseOrders: PURCHASE_ORDER_PERMISSIONS,
  salesOrders: SALES_ORDER_PERMISSIONS,
  divinoDashboard: DIVINO_DASHBOARD_PERMISSIONS
};

export {
  PERMISSIONS
};
//# sourceMappingURL=chunk-XYSQWTGQ.js.map
