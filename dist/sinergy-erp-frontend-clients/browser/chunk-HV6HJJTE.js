import {
  INVENTORY_PERMISSIONS
} from "./chunk-GOGMGDDG.js";
import {
  permissionGuard
} from "./chunk-F5ADD7XG.js";
import "./chunk-W5SEVSEZ.js";
import "./chunk-FDRLY3M3.js";
import "./chunk-RBFB2ZTY.js";
import "./chunk-GBHDNI6X.js";

// src/app/features/inventory/inventory.routes.ts
var INVENTORY_ROUTES = [
  {
    path: "",
    loadComponent: () => import("./chunk-W7Z4GBKH.js").then((m) => m.InventoryBatchListComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [INVENTORY_PERMISSIONS.viewList],
      title: "Inventario"
    }
  }
];
export {
  INVENTORY_ROUTES
};
//# sourceMappingURL=chunk-HV6HJJTE.js.map
