import {
  permissionGuard
} from "./chunk-F5ADD7XG.js";
import {
  LEAD_PERMISSIONS
} from "./chunk-EQHNMCLE.js";
import "./chunk-W5SEVSEZ.js";
import "./chunk-FDRLY3M3.js";
import "./chunk-RBFB2ZTY.js";
import "./chunk-GBHDNI6X.js";

// src/app/features/leads/leads.routes.ts
var LEADS_ROUTES = [
  {
    path: "",
    loadComponent: () => import("./chunk-2PSCNWMO.js").then((m) => m.LeadsList),
    canActivate: [permissionGuard],
    data: {
      permissions: [LEAD_PERMISSIONS.viewList]
    }
  },
  {
    path: "detail/:id",
    loadComponent: () => import("./chunk-EKRY6KBS.js").then((m) => m.LeadDetail),
    canActivate: [permissionGuard],
    data: {
      permissions: [LEAD_PERMISSIONS.viewDetail]
    }
  }
];
export {
  LEADS_ROUTES
};
//# sourceMappingURL=chunk-JOVBBT37.js.map
