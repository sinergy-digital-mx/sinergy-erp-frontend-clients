import {
  permissionGuard
} from "./chunk-VUCCMEPC.js";
import {
  LEAD_PERMISSIONS
} from "./chunk-EQHNMCLE.js";
import "./chunk-QU2SCCOO.js";
import "./chunk-YUPXBHST.js";
import "./chunk-FGZNYMY3.js";
import "./chunk-XEFUC5ED.js";

// src/app/features/leads/leads.routes.ts
var LEADS_ROUTES = [
  {
    path: "",
    loadComponent: () => import("./chunk-RAWC5VCH.js").then((m) => m.LeadsList),
    canActivate: [permissionGuard],
    data: {
      permissions: [LEAD_PERMISSIONS.viewList]
    }
  },
  {
    path: "detail/:id",
    loadComponent: () => import("./chunk-4YUK5VTZ.js").then((m) => m.LeadDetail),
    canActivate: [permissionGuard],
    data: {
      permissions: [LEAD_PERMISSIONS.viewDetail]
    }
  }
];
export {
  LEADS_ROUTES
};
//# sourceMappingURL=chunk-HWOVZ3C5.js.map
