import {
  permissionGuard
} from "./chunk-WNSJ6DL3.js";
import {
  LEAD_PERMISSIONS
} from "./chunk-EQHNMCLE.js";
import "./chunk-B7UOHVOJ.js";
import "./chunk-55FJTJJ6.js";
import "./chunk-BMMLV6YT.js";
import "./chunk-57S27ROJ.js";

// src/app/features/leads/leads.routes.ts
var LEADS_ROUTES = [
  {
    path: "",
    loadComponent: () => import("./chunk-24OCIT6B.js").then((m) => m.LeadsList),
    canActivate: [permissionGuard],
    data: {
      permissions: [LEAD_PERMISSIONS.viewList]
    }
  },
  {
    path: "detail/:id",
    loadComponent: () => import("./chunk-QYO4MMZX.js").then((m) => m.LeadDetail),
    canActivate: [permissionGuard],
    data: {
      permissions: [LEAD_PERMISSIONS.viewDetail]
    }
  }
];
export {
  LEADS_ROUTES
};
//# sourceMappingURL=chunk-QLVUYXGB.js.map
