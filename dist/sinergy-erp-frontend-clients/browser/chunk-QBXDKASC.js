import {
  CONTRACT_PERMISSIONS
} from "./chunk-EUPOEI4B.js";
import {
  permissionGuard
} from "./chunk-3TGAE7IB.js";
import "./chunk-7QZ6JYNG.js";
import "./chunk-524KR27D.js";
import "./chunk-MNFUR22A.js";
import "./chunk-CJAGDKD4.js";

// src/app/features/contracts/contracts.routes.ts
var CONTRACTS_ROUTES = [
  {
    path: "detail/:id",
    loadComponent: () => import("./chunk-26VUD6LJ.js").then((m) => m.ContractDetailPageComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [CONTRACT_PERMISSIONS.viewList]
    }
  },
  {
    path: "",
    loadComponent: () => import("./chunk-PRKIWWBA.js").then((m) => m.ContractsListComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [CONTRACT_PERMISSIONS.viewList]
    }
  }
];
export {
  CONTRACTS_ROUTES
};
//# sourceMappingURL=chunk-QBXDKASC.js.map
