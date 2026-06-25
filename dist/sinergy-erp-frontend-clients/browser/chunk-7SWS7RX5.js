import {
  ACCOUNTING_PERMISSIONS
} from "./chunk-KYMIAXQ3.js";
import {
  permissionGuard
} from "./chunk-3TGAE7IB.js";
import "./chunk-7QZ6JYNG.js";
import "./chunk-524KR27D.js";
import "./chunk-MNFUR22A.js";
import "./chunk-CJAGDKD4.js";

// src/app/features/accounting/accounting.routes.ts
var ACCOUNTING_ROUTES = [
  {
    path: "",
    loadComponent: () => import("./chunk-VZBXCQO3.js").then((m) => m.AccountingPageComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [ACCOUNTING_PERMISSIONS.read],
      title: "Cobranza / Contabilidad"
    }
  }
];
export {
  ACCOUNTING_ROUTES
};
//# sourceMappingURL=chunk-7SWS7RX5.js.map
