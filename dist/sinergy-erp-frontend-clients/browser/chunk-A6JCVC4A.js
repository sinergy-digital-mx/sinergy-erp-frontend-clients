import {
  INVENTORY_PERMISSIONS
} from "./chunk-XPSKNRZU.js";
import {
  permissionGuard
} from "./chunk-WNSJ6DL3.js";
import "./chunk-B7UOHVOJ.js";
import "./chunk-55FJTJJ6.js";
import "./chunk-BMMLV6YT.js";
import "./chunk-57S27ROJ.js";

// src/app/features/inventory/inventory.routes.ts
var INVENTORY_ROUTES = [
  {
    path: "",
    loadComponent: () => import("./chunk-FYVHOXFG.js").then((m) => m.InventoryBatchListComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [INVENTORY_PERMISSIONS.viewList],
      title: "Inventario"
    }
  },
  {
    path: "transfers",
    loadComponent: () => import("./chunk-W3JWTA6C.js").then((m) => m.TransferListComponent),
    canActivate: [permissionGuard],
    data: {
      permissions: [INVENTORY_PERMISSIONS.viewList],
      title: "Transferencias de inventario"
    }
  }
];
export {
  INVENTORY_ROUTES
};
//# sourceMappingURL=chunk-A6JCVC4A.js.map
