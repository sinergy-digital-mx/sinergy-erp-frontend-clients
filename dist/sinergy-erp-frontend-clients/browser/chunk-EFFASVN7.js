import {
  permissionGuard
} from "./chunk-YKJA6TLY.js";
import {
  LEAD_PERMISSIONS
} from "./chunk-EQHNMCLE.js";
import "./chunk-2BSLK6RD.js";
import "./chunk-NC3JAQUC.js";
import "./chunk-GZH4LDOW.js";
import "./chunk-7ZU2RCPO.js";

// src/app/features/leads/leads.routes.ts
var LEADS_ROUTES = [
  {
    path: "",
    loadComponent: () => import("./chunk-PINOL46Z.js").then((m) => m.LeadsList),
    canActivate: [permissionGuard],
    data: {
      permissions: [LEAD_PERMISSIONS.viewList]
    }
  },
  {
    path: "detail/:id",
    loadComponent: () => import("./chunk-N6PWP2CM.js").then((m) => m.LeadDetail),
    canActivate: [permissionGuard],
    data: {
      permissions: [LEAD_PERMISSIONS.viewDetail]
    }
  }
];
export {
  LEADS_ROUTES
};
//# sourceMappingURL=chunk-EFFASVN7.js.map
