import {
  CONTRACT_PERMISSIONS
} from "./chunk-EUPOEI4B.js";
import {
  permissionGuard
} from "./chunk-F5ADD7XG.js";
import "./chunk-W5SEVSEZ.js";
import "./chunk-FDRLY3M3.js";
import "./chunk-RBFB2ZTY.js";
import "./chunk-GBHDNI6X.js";

// src/app/features/contracts/contracts.routes.ts
var CONTRACTS_ROUTES = [
  {
    path: "detail/:id",
    loadComponent: () => import("./chunk-M62J732L.js").then((m) => m.ContractDetailPageComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [CONTRACT_PERMISSIONS.viewList]
    }
  },
  {
    path: "",
    loadComponent: () => import("./chunk-6Z3OS7AE.js").then((m) => m.ContractsListComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [CONTRACT_PERMISSIONS.viewList]
    }
  }
];
export {
  CONTRACTS_ROUTES
};
//# sourceMappingURL=chunk-PQOXFVFG.js.map
