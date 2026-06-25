import {
  CONTRACT_PERMISSIONS
} from "./chunk-EUPOEI4B.js";
import {
  permissionGuard
} from "./chunk-VUCCMEPC.js";
import "./chunk-QU2SCCOO.js";
import "./chunk-YUPXBHST.js";
import "./chunk-FGZNYMY3.js";
import "./chunk-XEFUC5ED.js";

// src/app/features/contracts/contracts.routes.ts
var CONTRACTS_ROUTES = [
  {
    path: "detail/:id",
    loadComponent: () => import("./chunk-OBER4DXL.js").then((m) => m.ContractDetailPageComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [CONTRACT_PERMISSIONS.viewList]
    }
  },
  {
    path: "",
    loadComponent: () => import("./chunk-ZTKJUJH5.js").then((m) => m.ContractsListComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [CONTRACT_PERMISSIONS.viewList]
    }
  }
];
export {
  CONTRACTS_ROUTES
};
//# sourceMappingURL=chunk-TW43OBFQ.js.map
