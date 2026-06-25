import {
  CONTRACT_PERMISSIONS
} from "./chunk-EUPOEI4B.js";
import {
  permissionGuard
} from "./chunk-WNSJ6DL3.js";
import "./chunk-B7UOHVOJ.js";
import "./chunk-55FJTJJ6.js";
import "./chunk-BMMLV6YT.js";
import "./chunk-57S27ROJ.js";

// src/app/features/contracts/contracts.routes.ts
var CONTRACTS_ROUTES = [
  {
    path: "detail/:id",
    loadComponent: () => import("./chunk-T75AAJ57.js").then((m) => m.ContractDetailPageComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [CONTRACT_PERMISSIONS.viewList]
    }
  },
  {
    path: "",
    loadComponent: () => import("./chunk-JHKH2PL5.js").then((m) => m.ContractsListComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [CONTRACT_PERMISSIONS.viewList]
    }
  }
];
export {
  CONTRACTS_ROUTES
};
//# sourceMappingURL=chunk-LCTGSQHU.js.map
