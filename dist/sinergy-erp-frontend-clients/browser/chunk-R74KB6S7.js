import {
  CONTRACT_PERMISSIONS
} from "./chunk-EUPOEI4B.js";
import {
  permissionGuard
} from "./chunk-R3HY2RGV.js";
import "./chunk-MDAYJWTZ.js";
import "./chunk-SH63266R.js";
import "./chunk-6DLZ3MOQ.js";
import "./chunk-JD27NKNP.js";

// src/app/features/contracts/contracts.routes.ts
var CONTRACTS_ROUTES = [
  {
    path: "detail/:id",
    loadComponent: () => import("./chunk-U6UXKVUR.js").then((m) => m.ContractDetailPageComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [CONTRACT_PERMISSIONS.viewList]
    }
  },
  {
    path: "",
    loadComponent: () => import("./chunk-JJSBYVEK.js").then((m) => m.ContractsListComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [CONTRACT_PERMISSIONS.viewList]
    }
  }
];
export {
  CONTRACTS_ROUTES
};
//# sourceMappingURL=chunk-R74KB6S7.js.map
