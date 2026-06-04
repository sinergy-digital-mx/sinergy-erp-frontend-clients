import {
  permissionGuard
} from "./chunk-R3HY2RGV.js";
import {
  LEAD_PERMISSIONS
} from "./chunk-EQHNMCLE.js";
import "./chunk-MDAYJWTZ.js";
import "./chunk-SH63266R.js";
import "./chunk-6DLZ3MOQ.js";
import "./chunk-JD27NKNP.js";

// src/app/features/leads/leads.routes.ts
var LEADS_ROUTES = [
  {
    path: "",
    loadComponent: () => import("./chunk-3TYLCJF3.js").then((m) => m.LeadsList),
    canActivate: [permissionGuard],
    data: {
      permissions: [LEAD_PERMISSIONS.viewList]
    }
  },
  {
    path: "detail/:id",
    loadComponent: () => import("./chunk-TF4W24LC.js").then((m) => m.LeadDetail),
    canActivate: [permissionGuard],
    data: {
      permissions: [LEAD_PERMISSIONS.viewDetail]
    }
  }
];
export {
  LEADS_ROUTES
};
//# sourceMappingURL=chunk-JXLV64FU.js.map
