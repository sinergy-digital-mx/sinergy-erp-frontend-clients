import {
  INVENTORY_PERMISSIONS
} from "./chunk-GOGMGDDG.js";
import {
  permissionGuard
} from "./chunk-R3HY2RGV.js";
import "./chunk-MDAYJWTZ.js";
import "./chunk-SH63266R.js";
import "./chunk-6DLZ3MOQ.js";
import "./chunk-JD27NKNP.js";

// src/app/features/inventory/inventory.routes.ts
var INVENTORY_ROUTES = [
  {
    path: "",
    loadComponent: () => import("./chunk-6LBDLXG4.js").then((m) => m.InventoryBatchListComponent),
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
//# sourceMappingURL=chunk-55C24KVX.js.map
