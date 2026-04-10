import {
  CONTRACT_PERMISSIONS
} from "./chunk-EUPOEI4B.js";
import {
  permissionGuard
} from "./chunk-YKJA6TLY.js";
import "./chunk-2BSLK6RD.js";
import "./chunk-NC3JAQUC.js";
import "./chunk-GZH4LDOW.js";
import "./chunk-7ZU2RCPO.js";

// src/app/features/contracts/contracts.routes.ts
var CONTRACTS_ROUTES = [
  {
    path: "",
    loadComponent: () => import("./chunk-IR55O5S3.js").then((m) => m.ContractsListComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [CONTRACT_PERMISSIONS.viewList]
    }
  }
];
export {
  CONTRACTS_ROUTES
};
//# sourceMappingURL=chunk-N2ASV6JH.js.map
